import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  loadingLayerState: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  setLoadingLayerState(state: boolean) {
    this.loadingLayerState.next(state);
  }

  getLoadingLayerState(): Observable<boolean> {
    return this.loadingLayerState.asObservable();
  }
}
