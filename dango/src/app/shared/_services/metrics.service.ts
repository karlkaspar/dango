import { Injectable } from '@angular/core';
import { Metrics } from 'src/app/_domain/metrics.interface';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  constructor() { }

  addToMetrics(action) {
    const allActions: Metrics = JSON.parse(localStorage.getItem('metrics')) ? JSON.parse(localStorage.getItem('metrics')) : [];
    let actionCount = allActions[action];
    actionCount = actionCount ? actionCount + 1 : actionCount = 1;
    allActions[action] = actionCount;
    localStorage.setItem('metrics', JSON.stringify(allActions));
  }

  getMetrics(): Metrics {
    return JSON.parse(localStorage.getItem('metrics'));
  }

}
