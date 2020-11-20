import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/_common/base/base.component';
import { ImgService } from 'src/app/shared/_services/img.service';
import { Album, Photo } from 'src/app/_domain';
import { LogsService } from 'src/app/shared/_services/logs.service';
import { MetricsService } from 'src/app/shared/_services/metrics.service';


@Component({
  selector: 'app-view-album',
  templateUrl: './view-album.component.html',
  styleUrls: ['./view-album.component.css']
})
export class ViewAlbumComponent extends BaseComponent implements OnInit {
  albumId: number;
  album: Album; // TODO: TYPE
  photos: Photo; // TODO: TYPE
  userId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imgService: ImgService,
    private logsService: LogsService,
    private metricsService: MetricsService
  ) { super(); }

  ngOnInit() {
    this.route.paramMap.subscribe(async paramMap => {
      this.albumId = parseInt(paramMap.get('id'), 10);
      if (this.albumId) {
        this.getAlbum();
        this.getPhotos();
      } else {
        this.goBack();
      }
    });
  }

  async getPhotos() {
    try {
      const response = await this.imgService.getPhotos(this.albumId).toPromise();
      if (response) {
        this.photos = response;
      }
    } catch (error) {
      console.warn('ERROR LOADING USER ALBUM', error);
    }
  }

  async getAlbum() {
    try {
      const response = await this.imgService.getAlbum(this.albumId).toPromise();
      if (response) {
        this.album = response;
        this.userId = response.userId;
      }
    } catch (error) {
      console.warn('ERROR LOADING USER ALBUM', error);
    }
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

  async addPhoto() {
    try {
      const response = await this.imgService.addPhoto(this.albumId).toPromise();
      if (response) {
        // ALBUM CREATION SUCCESS
        this.logsService.addToLogs({
          id: Math.floor(Math.random() * 200), // DUMMY EVENT ID
          userId: 1,
          type: 'create',
          context: 'album',
          contextId: Math.floor(Math.random() * 200), // SERVER RESPONSE, ALWAYS CONTAINS id: 101, SO ADDING DUMMY ID
          cubContext: 'photo',
          subContextId: Math.floor(Math.random() * 200), // DUMMY  ID
          timeStamp: new Date()
        });
        this.metricsService.addToMetrics('photosAdded');
      }
    } catch (error) {
      console.warn('ERROR DELETING USER PHOTO', error);
    }
  }
  async deletePhoto(photoId) {
    try {
      const response = await this.imgService.deletePhoto(this.albumId, photoId).toPromise();
      if (response) {
        // PHOTO DELETION SUCCESS
        this.logsService.addToLogs({
          id: Math.floor(Math.random() * 200), // DUMMY EVENT ID
          userId: this.userId,
          type: 'delete',
          context: 'album',
          contextId: this.albumId,
          subContext: 'photo',
          subContextId: photoId,
          timeStamp: new Date()
        });
        this.metricsService.addToMetrics('photosDeleted');
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
