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
  caregiverName: string;
  caregiver: Caregiver;
  availableCaregivers: Array<any> = [];
  caregiversSub: Subscription;
  schedule: Schedule;
  query: any;

  startDate: Date;
  stopDate: Date;
  postalCode: string;
  services: Array<any>;
  results: any;

  dailyCare;
  specialCare;

  caregivers: Array<any> = [];
  s: Array<any> = [];
  matches: Array<any> = [];
  stars: Array<any> = [];
  halfStar = false;
  reviews: Array<any> = [];

  elderName: string;

  requireInterview = false;


  constructor(public searchService: SearchService, public authService: AuthService, public http: HttpClient, public route: ActivatedRoute) { }

  ngOnInit() {
    this.elderEmail = this.authService.getUserId();
    // this.elderEmail = 'john@gmail.com';
    // this.searchService.getCaregivers().subscribe((data) => {
    //   this.caregivers = data.users;
    // });
    this.searchService.getElder(this.elderEmail).subscribe(data => {
      this.elderName = data.name;
    });
    this.route.queryParamMap.subscribe(params => {
      this.query = { ...params.keys, ...params };
    });
    // console.log(this.query.params.postalCode);
    // console.log(this.query.params.startDate);
    // console.log(this.query.params.stopDate);
    this.startDate = this.query.params.startDate;
    this.stopDate = this.query.params.stopDate;
    this.postalCode = this.query.params.postalCode;
    this.services = this.query.params.services;
    this.dailyCare = this.query.params.dailyCare;
    this.specialCare = this.query.params.specialCare;
    console.log(this.dailyCare);
    console.log(this.specialCare);
    // this.searchService.searchCaregivers(this.postalCode, this.startDate, this.stopDate, this.services);
    this.searchCaregivers(this.postalCode, this.startDate, this.stopDate, this.dailyCare, this.specialCare);
    // this.request('elderemail@gmail.com', 'caregiveremail@gmail.com', this.startDate, this.stopDate, true);
  }

  searchCaregivers(postalCode: string, startDate: Date, stopDate: Date, dailyCare: any, specialCare: any) {
    this.http
      .get<{ message: string; users: any }>(
        BACKEND_URL + 'caregivers/',
      )
      .subscribe((data) => {
        this.caregivers = data.users;
        this.caregivers.forEach(element => {
          this.s = element.schedule;
          if (this.s !== null) {
            this.s.forEach(item => {
              const date = new Date(item.startDate);
              const sDate = new Date(startDate);
              console.log(date + ' > ' + sDate);
              console.log(date >= sDate);
              if (date >= sDate) {
                console.log('hello');
                if (element !== null) {
                  this.availableCaregivers.push(element);
                  element = null;
                }
              }
            });
          }
        });
        console.log(this.availableCaregivers);
        const postalSearch: Fuse.FuseOptions<any> = {
          keys: ['postalCode'],
        };
        const fuse = new Fuse(this.availableCaregivers, postalSearch);

        this.results = fuse.search(`${postalCode}`);
        console.log(this.results);
        console.log(dailyCare);
        console.log(specialCare);
        // const serviceSearch: Fuse.FuseOptions<any> = {
        //   includeScore: true,
        //   keys: ['services.dailyCare', 'services.specialCare']
        // };
        // const newfuse = new Fuse(this.results, serviceSearch);
        // console.log(newfuse);
        // this.results = newfuse.search(`${dailyCare} ${specialCare}`);
        // console.log(this.results);


        this.results.forEach(element => {
          this.stars = [];
          this.halfStar = false;
          this.reviews = [];
          console.log(element.item);
          const p = (1 - element.score) * 100;
          console.log(p.toFixed(2) + '%');
          element.item.percentage = p.toFixed(2);
          console.log(element.item);
          this.matches.push(element.item);

          this.http.get<Array<any>>(BACKEND_URL + 'history/' + element.item.email).subscribe(data => {
            let rating = null;
            let round = null;
            data.forEach(item => {
              if (item.rating !== null) {
                rating = rating + item.rating;
                round++;
              }
              if (item.review !== null) {
                const i = {
                  reviewer: item.elderName,
                  review: item.review,
                  rating: item.rating
                };
                this.reviews.push(i);
              }
            });
            console.log(`${rating} / ${round}`);
            rating = rating / round;
            console.log(rating);
            if (rating % 1 > 0) {
              this.halfStar = true;
            }
            for (let index = 1; index <= rating; index++) {
              this.stars.push('item');
            }
            // element.item.rating = rating;
            // this.matches.push(element.item);
          });
        });
        // this.results = newfuse.search(`${specialCare}`);
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

  toggle(item: boolean) {
    console.log(item);
    this.requireInterview = item;
  }

  setValue(email: string, name: string) {
    this.caregiverEmail = email;
    this.caregiverName = name;
  }


  request() {
    this.searchService.sendRequest(this.elderEmail, this.caregiverEmail, this.elderName, this.caregiverName, this.startDate, this.stopDate, this.requireInterview, null);
  }


  reload() {
    location.reload();
  }

}
