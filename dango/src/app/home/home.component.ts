import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { BaseComponent } from '../shared/_common/base/base.component';
import { UserService } from '../shared/_services/user.service';
import { User, Album } from '../_domain';
import { Router } from '@angular/router';
import { ImgService } from '../shared/_services/img.service';
import { LogsService } from '../shared/_services/logs.service';
import { MetricsService } from '../shared/_services/metrics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {
  users: User;
  userAlbums: Album;
  albumsModalName: string;
  @ViewChild('albumsModal', { static: false }) albumsModal: TemplateRef<any>;
  userId: number;

  constructor(
    private router: Router,
    public userService: UserService,
    public imgService: ImgService,
    public logsService: LogsService,
    public metricsService: MetricsService
  ) { super(); }

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription !== undefined) {
        subscription.unsubscribe();
      }
    });
    this.unsubscribeAllFromList();
  }

  async loadUsers() {
    try {
      const response = await this.userService.getUsers().toPromise();
      if (response) {
        this.users = response;
      } else {
        console.warn('ERROR LOADING USERS');
      }
    } catch (error) {
      console.warn('ERROR LOADING USERS', error);
    }
  }

  async showAlbums(userId: number, name: string) {
    if (userId) {
      this.albumsModalName = name;
      this.userId = userId;
      try {
        const response = await this.imgService.getUserAlbums(userId).toPromise();
        if (response) {
          this.userAlbums = response;
        }
      } catch (error) {
        console.warn('ERROR LOADING USER ALBUM', error);
      }
      this.openModal(this.albumsModal);
    }
  }

  goToAlbum(albumId: number) {
    this.closeModal();
    this.router.navigate(['./album/' + albumId]);
  }

  async deleteAlbum(albumId: number) {
    try {
      const response = await this.imgService.deleteAlbum(albumId).toPromise();
      if (response) {
        // DELETION SUCCESS
        this.logsService.addToLogs({
          id: Math.floor(Math.random() * 200), // DUMMY EVENT ID
          userId: 1,
          type: 'delete',
          context: 'album',
          contextId: albumId,
          timeStamp: new Date()
        });
        this.metricsService.addToMetrics('albumsDeleted');
      }
    } catch (error) {
      console.warn('ERROR DELETING USER PHOTO', error);
    }
  }

  async createAlbum() {
    try {
      const response = await this.imgService.createAlbum(this.userId).toPromise();
      if (response) {
        // ALBUM CREATION SUCCESS
        this.logsService.addToLogs({
          id: Math.floor(Math.random() * 200), // DUMMY EVENT ID
          userId: response.userId,
          type: 'create',
          context: 'album',
          contextId: Math.floor(Math.random() * 200), // SERVER RESPONSE, ALWAYS CONTAINS id: 101, SO ADDING DUMMY ID
          timeStamp: new Date()
        });
        this.metricsService.addToMetrics('albumsCreated');
      }
    } catch (error) {
      console.warn('ERROR DELETING USER PHOTO', error);
    }
  }
}
