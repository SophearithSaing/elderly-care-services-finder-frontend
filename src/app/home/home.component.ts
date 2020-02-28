import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { SearchService } from '../services/search.service';

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: string = null;
  elderNumber: number;
  caregiverNumber: number;

  constructor(private http: HttpClient, private search: SearchService) { }

  ngOnInit() {
    this.getEldersNumber().subscribe(data => {
      this.elderNumber = data.count;
      console.log('Elder numbers is ' + this.elderNumber);
    });
    this.getCGNumber().subscribe(data => {
      this.caregiverNumber = data.count;
      console.log('Elder numbers is ' + this.caregiverNumber);
    });

  }

  elder() {
    this.user = 'elder';
  }

  caregiver() {
    this.user = 'caregiver';
  }

  getEldersNumber() {
    return this.http
      .get<{ count: any }>(
        BACKEND_URL + 'alle'
      );
  }

  getCGNumber() {
    return this.http
      .get<{ count: any }>(
        BACKEND_URL + 'allcg'
      );
  }

}
