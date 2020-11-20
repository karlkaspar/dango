import { Injectable } from '@angular/core';
import { Logs } from 'src/app/_domain';
@Injectable({
  providedIn: 'root'
})
export class LogsService {
  constructor() { }
  addToLogs(action) {
    // localStorage.removeItem('logs');
    // return;
    let logs = JSON.parse(localStorage.getItem('logs'));
    logs ? logs.push(action) : logs = [action];
    localStorage.setItem('logs', JSON.stringify(logs))
  }

  getLogs() {
    return JSON.parse(localStorage.getItem('logs'));
  }

}
