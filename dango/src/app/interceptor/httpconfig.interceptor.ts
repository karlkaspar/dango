import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseComponent } from '../shared/_common/base/base.component';


@Injectable()
export class HttpConfigInterceptor extends BaseComponent implements HttpInterceptor {

  constructor() { super(); }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError((error: any) => { // HTTPERRORRESPONSE
          if ([500, 401, 403, 404].includes(error.status)) {
            console.log(error);
            // DO SOMETHING, SHOW A NOTIFICATION MAYBE
          } else {
            return throwError(error);
          }
        }));
  }
}
