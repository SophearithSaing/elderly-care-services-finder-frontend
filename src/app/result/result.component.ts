import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Caregiver } from '../models/caregiver.model';
import { SearchService } from '../services/search.service';
import { User } from '../models/user.model';
import { Elder } from '../models/elder.model';
import { AuthService } from '../auth/auth.service';
import { Schedule } from '../models/schedule.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import * as Fuse from 'fuse.js';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  panelOpenState = false;

  elderEmail: string;
  caregiverEmail: string;
  caregiver: Caregiver;
  caregivers: any;
  caregiversSub: Subscription;
  schedule: Schedule;
  query: any;

  startDate: Date;
  stopDate: Date;
  postalCode: string;
  services: Array<any>;
  results: any;

  constructor(public searchService: SearchService, public authService: AuthService, public http: HttpClient, public route: ActivatedRoute) { }

  ngOnInit() {
    // this.elderEmail = this.authService.getUserId();
    this.elderEmail = 'mong@gmail.com';
    // this.searchService.getCaregivers().subscribe((data) => {
    //   this.caregivers = data.users;
    // });
    this.route.queryParamMap.subscribe(params => {
      this.query = {...params.keys, ...params};
    });
    // console.log(this.query.params.postalCode);
    // console.log(this.query.params.startDate);
    // console.log(this.query.params.stopDate);
    this.startDate = this.query.params.startDate;
    this.stopDate = this.query.params.stopDate;
    this.postalCode = this.query.params.postalCode;
    this.services = this.query.params.services;
    // this.searchService.searchCaregivers(this.postalCode, this.startDate, this.stopDate, this.services);
    this.searchCaregivers(this.postalCode, this.startDate, this.stopDate, this.services);
    // this.request('elderemail@gmail.com', 'caregiveremail@gmail.com', this.startDate, this.stopDate, true);
  }

  searchCaregivers(postalCode: string, startDate: Date, stopDate: Date, services: Array<any>): any {
    this.http
    .get<{ message: string; users: any }>(
      BACKEND_URL + 'caregivers/',
    )
    .subscribe((data) => {
      const postalSearch: Fuse.FuseOptions<any> = {
        keys: ['postalCode'],
      };
      const fuse = new Fuse(data.users, postalSearch);

      this.results = fuse.search(`${postalCode}`);
      // console.log(this.results);
      // const dateSearch: Fuse.FuseOptions<any> = {
      //   keys: ['schedule.startDate', 'schedule.stopDate'],
      // };
      // const newfuse = new Fuse(this.results, dateSearch);
      // this.results = newfuse.search(`${startDate}`);
      // console.log(`search for date ${startDate}`);
      // console.log(dateSearch);
      // console.log(this.results);
    });
  }


  request(caregiverEmail: string, requireInterview: boolean) {
    this.searchService.sendRequest(this.elderEmail, caregiverEmail, this.startDate, this.stopDate, requireInterview, false);
  }

}
