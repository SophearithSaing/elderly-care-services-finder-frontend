import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: string = null;

  constructor() { }

  ngOnInit() {
  }

  elder() {
    this.user = 'elder';
  }

  caregiver() {
    this.user = 'caregiver';
  }

}
