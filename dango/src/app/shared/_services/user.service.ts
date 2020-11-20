import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINT } from '../../app.constants';

import { User } from '../../_domain';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User> {
    return this.http.get<User>(API_ENDPOINT + 'users').pipe(map((response: User) => response));
  }
}
