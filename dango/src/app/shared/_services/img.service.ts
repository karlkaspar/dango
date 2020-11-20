import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINT } from '../../app.constants';

import { Album } from 'src/app/_domain';

@Injectable({
  providedIn: 'root'
})
export class ImgService {

  constructor(private http: HttpClient) { }

  getUserAlbums(userId: number): Observable<Album> {
    return this.http.get<any>(API_ENDPOINT + 'users/' + userId + '/albums').pipe(map((response: Album) => response));
  }

  getAlbum(albumId: number): Observable<any> {
    return this.http.get<any>(API_ENDPOINT + 'albums/' + albumId).pipe(map((response: any) => response));
  }

  getPhotos(albumId: number) {
    return this.http.get<any>(API_ENDPOINT + 'albums/' + albumId + '/photos').pipe(map((response: any) => response));
  }

  deleteAlbum(albumId: number) {
    return this.http.delete<any>(API_ENDPOINT + 'albums/' + albumId).pipe(map((response: any) => response));
  }

  deletePhoto(albumId: number, photoId: number) {
    return this.http.delete<any>(API_ENDPOINT + 'photos/' + photoId).pipe(map((response: any) => response));
  }

  addPhoto(albumId: number) { // RETURNS 204, LEFT IT AS IS
    return this.http.post<any>(API_ENDPOINT + 'photos', {
      id: Math.floor(Math.random() * 200),
      albumId,
      title: 'Peppa Pig',
      url: 'sample',
      thumbnailUrl: '123'
    }).pipe(map((response: any) => response));
  }

  createAlbum(userId: number) {  // RETURNS 204, LEFT IT AS IS
    return this.http.post<any>(API_ENDPOINT + 'albums', {
      userId,
      title: 'Peppa Pig',
    }).pipe(map((response: any) => response));
  }
}
