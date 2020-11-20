import { Component, OnInit } from '@angular/core';
import { Metrics } from '../_domain/metrics.interface';
import { MetricsService } from '../shared/_services/metrics.service';
import { BaseComponent } from '../shared/_common/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../_domain';
import { ImgService } from '../shared/_services/img.service';
import { LogsService } from '../shared/_services/logs.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BaseComponent implements OnInit {
  metrics: Metrics;
  userId: number;
  userAlbums: Album;
  constructor(
    private route: ActivatedRoute,
    private metricsService: MetricsService,
    private imgService: ImgService,
    private logsService: LogsService) { super(); }

  ngOnInit() {
    this.route.paramMap.subscribe(async paramMap => {
      this.userId = parseInt(paramMap.get('id'), 10);
      if (this.userId) {
        this.metrics = this.metricsService.getMetrics();
        this.getUserAlbums();
      } else {
        this.goBack();
      }
    });

  }

  async getUserAlbums() {
    try {
      const response = await this.imgService.getUserAlbums(this.userId).toPromise();
      if (response) {
        this.userAlbums = response;
      }
    } catch (error) {
      console.warn('ERROR LOADING USER ALBUM', error)
    }
  }

  async deleteAlbum(albumId: number) {
    try {
      const response = await this.imgService.deleteAlbum(albumId).toPromise();
      if (response) {
        // DELETION SUCCESS
        this.logsService.addToLogs({
          id: Math.floor(Math.random() * 200), // DUMMY EVENT ID
          userId: response.userId,
          type: "delete",
          context: "album",
          contextId: albumId,
          timeStamp: new Date
        });
        await this.metricsService.addToMetrics('albumsDeleted');
        this.metrics = this.metricsService.getMetrics();
      }
    } catch (error) {
      console.warn('ERROR DELETING USER PHOTO', error)
    }
  }
}
