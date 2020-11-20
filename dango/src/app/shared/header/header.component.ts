import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() { }
  currentUserId = 1; // HARDCODED BECAUSE NO OTHER, OBVIOUS WAY EXIST TO GET THIS NUMBER
  ngOnInit() {
  }
}
