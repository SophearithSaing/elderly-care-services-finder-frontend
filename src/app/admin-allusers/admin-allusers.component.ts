import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { SearchService } from '../services/search.service';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-admin-allusers',
  templateUrl: './admin-allusers.component.html',
  styleUrls: ['./admin-allusers.component.css']
})
export class AdminAllusersComponent implements OnInit {

  elders;

  // caregivers variables
  caregivers;
  stars = [];
  halfStar: boolean;
  reviews = [];


  constructor(
    private admin: AdminService,
    private search: SearchService,
    private http: HttpClient) { }

  ngOnInit() {
    this.search.getCaregivers().subscribe(data => {
      this.caregivers = data.users;

      // get star rating
      this.caregivers.forEach(element => {
        // this.stars = [];
        this.halfStar = false;
        // this.reviews = [];

        this.http.get<Array<any>>(BACKEND_URL + 'history/' + element.email).subscribe(res => {
          let rating = null;
          let round = null;
          res.forEach(item => {
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
            console.log(element);
            for (let index = 1; index <= rating; index++) {
              this.stars.push('star');
            }
            element.stars = this.stars;
            // console.log(element.item);
            // element.item.rating = rating;

          }
        });
      });

      // // sort by name
      // this.caregivers.sort((a, b) => (a.percentage < b.percentage) ? 1 : -1);
    });
    this.search.getElders().subscribe(data => {
      this.elders = data.users;
    });
  }

}
