import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Caregiver } from '../models/caregiver.model';
import { SearchService } from '../services/search.service';
import { User } from '../models/user.model';
import { Elder } from '../models/elder.model';
import { AuthService } from '../auth/auth.service';
import { Schedule } from '../models/schedule.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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
  // results: any;
  results = [];

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

  index: number;


  constructor(
    public searchService: SearchService,
    public authService: AuthService,
    public http: HttpClient,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.elderEmail = this.authService.getUserId();
    // this.elderEmail = 'sophearithsaing123@hotmail.com';
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

        // get the one with matched dates
        this.caregivers.forEach(element => {
          element.showButton = true;
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

        // search via postalcode match
        console.log(this.availableCaregivers);
        const postalSearch: Fuse.FuseOptions<any> = {
          keys: ['postalCode'],
          includeScore: true
        };
        const fuse = new Fuse(this.availableCaregivers, postalSearch);
        let fuses: any;
        fuses = fuse.search(`${postalCode}`);
        fuses.forEach(element => {
          const item = element.item;
          const p = (1 - element.score) * 100;
          const p2 = p.toFixed(2);
          const p3 = parseInt(p2, 10);
          item.percentage = p3;
          console.log(item);
          this.results.push(item);
          console.log(item);
        });

        console.log(this.results);
        console.log(this.dailyCare);
        console.log(this.specialCare);

        // get matched services
        // let ds = 0;
        // let dsMatched = 0;
        // this.dailyCare.forEach(element => {
        //   console.log(element);
        //   this.results.forEach(item => {
        //     dsMatched = 0;
        //     console.log(item);
        //     const daily = item.services.dailyCare;
        //     console.log(dailyCare);
        //     daily.forEach(service => {
        //       if (service === element) {
        //         console.log(service + ' = ' + element);
        //         dsMatched += 1;
        //       }
        //     });
        //     console.log(dsMatched, ds);
        //     const average = (dsMatched / ds) * 100;
        //     console.log(average);
        //   });
        //   ds += 1;
        // });

        let dc = 0;
        let dcMatched = 0;
        dc = this.dailyCare.length;
        let sc = 0;
        let scMatched = 0;
        sc = this.specialCare.length;
        console.log('array length is ' + dc);

        // get every cg
        this.results.forEach(item => {
          console.log(item);
          const daily = item.services.dailyCare;
          console.log(dailyCare);

          // get matched daily care
          dcMatched = 0;
          daily.forEach(service => {
            this.dailyCare.forEach(element => {
              if (service === element) {
                console.log(service + ' = ' + element);
                dcMatched++;
              }
            });
          });

          // get matched special care
          const special = item.services.specialCare;
          scMatched = 0;
          console.log(special);
          special.forEach(service => {
            this.specialCare.forEach(element => {
              if (service === element) {
                console.log(service + ' = ' + element);
                scMatched++;
              }
            });
          });

          console.log(dcMatched, dc);
          const dcp = (dcMatched / dc) * 100;
          console.log('percentage for ' + item.name + ' is ' + dcp);

          console.log(scMatched, sc);
          const scp = (scMatched / sc) * 100;
          console.log('percentage for ' + item.name + ' is ' + scp);

          console.log(item.percentage);
          const avg = (((dcp + scp) / 2) + item.percentage) / 2;
          console.log(avg);
          const percentage = avg.toFixed(2);
          // item.percentage = percentage;
          item.percentage = parseInt(percentage, 10);

          const birthYear = new Date(item.birthDate).getFullYear();
          const year = new Date().getFullYear();
          item.age = year - birthYear;
        });



        // const serviceSearch: Fuse.FuseOptions<any> = {
        //   includeScore: true,
        //   keys: ['services.dailyCare', 'services.specialCare']
        // };
        // const newfuse = new Fuse(this.results, serviceSearch);
        // console.log(newfuse);
        // this.results = newfuse.search(`${dailyCare}`);
        // console.log(this.results);
        // this.results = newfuse.search(`${specialCare}`);
        // console.log(this.results);
        // console.log(this.results);


        // get star rating
        this.results.forEach(element => {
          this.stars = [];
          this.halfStar = false;
          this.reviews = [];
          console.log(element);

          this.http.get<Array<any>>(BACKEND_URL + 'history/' + element.email).subscribe(data => {
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
            if (rating !== null) {
              console.log(`${rating} / ${round}`);
              rating = rating / round;
              console.log(rating);
              if (rating % 1 > 0) {
                this.halfStar = true;
              }
              for (let index = 1; index <= rating; index++) {
                this.stars.push('item');
              }
              element.item.rating = rating;
              this.matches.push(element.item);
              console.log(this.matches);
            }
          });
        });

        // this.results.sort((a, b) => (a.percentage > b.percentage) ? 1 : (a.percentage === b.percentage) ? ((a.name > b.name) ? 1 : -1) : -1 );
        // sort by percentage
        this.results.sort((a, b) => (a.percentage < b.percentage) ? 1 : -1);
        console.log(this.results);

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

  setValue(email: string, name: string, index: number) {
    this.caregiverEmail = email;
    this.caregiverName = name;
    this.index = index;
  }

  request() {
    this.searchService.sendRequest(this.elderEmail, this.caregiverEmail, this.elderName, this.caregiverName, this.startDate, this.stopDate, this.requireInterview, null);
    console.log('this ran');
    console.log(this.index);
    console.log(this.results[this.index]);
    this.results[this.index].showButton = false;
    console.log(this.results[this.index]);
  }


  home() {
    this.router.navigate(['/elder-home']);
    // setTimeout(() => {
    //   this.router.navigate(['/elder-home']);
    // }, 1000);
  }

}
