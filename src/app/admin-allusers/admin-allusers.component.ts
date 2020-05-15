import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { SearchService } from '../services/search.service';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-admin-allusers',
  templateUrl: './admin-allusers.component.html',
  styleUrls: ['./admin-allusers.component.css']
})
export class AdminAllusersComponent implements OnInit {

  panelOpenState = false;

  // elders varaible
  elders;
  eLoading: boolean;

  // caregivers variables
  caregivers;
  stars = [];
  halfStar: boolean;
  reviews = [];
  cgLoading: boolean;
  certificateValue: string;

  adminEmail: string;


  constructor(
    private admin: AdminService,
    private search: SearchService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.adminEmail = this.authService.getUserId();
    if (this.adminEmail !== 'admin@mail.com') {
      this.router.navigate(['./']);
    }
    this.cgLoading = true;
    this.eLoading = true;

    this.search.getCaregivers().subscribe(data => {
      this.caregivers = data.users;

      this.caregivers.forEach(element => {
        // calculate age
        const thisYear = new Date().getFullYear();
        const cgYear = new Date(element.birthDate).getFullYear();
        const cgAge = thisYear - cgYear;
        element.age = cgAge;
        console.log(thisYear, cgYear, cgAge);

        // calculate joined date
        const today = new Date();
        const joinedDate = new Date(element.joinedDate);
        const days = Math.trunc((today.getTime() - joinedDate.getTime()) / (24 * 3600 * 1000));
        if (days === 1) {
          element.days = `${days} day`;
        } else if (days > 1) {
          element.days = `${days} days`;
        }
        if (days > 30) {
          const months = Math.trunc(days / 30);
          let monthsString: string;
          const daysLeft = days % 30;
          let daysLeftString: string;
          if (daysLeft > 0) {
            if (daysLeft === 1) {
              daysLeftString = '1 day';
            } else if (daysLeft > 1) {
              daysLeftString = `${daysLeft} days`;
            }
          }
          if (daysLeft === 0) {
            daysLeftString = '';
          }
          if (months === 1) {
            monthsString = '1 month';
          } else if (months > 1) {
            monthsString = `${months} months`;
          }
          element.days = monthsString + ' ' + daysLeftString;
        }


        element.reviews = null;
        this.halfStar = false;

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
              element.reviews = this.reviews;
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
      this.cgLoading = false;
    });
    this.search.getElders().subscribe(data => {
      this.elders = data.users;

      this.elders.forEach(element => {
        // calculate age
        const thisYear = new Date().getFullYear();
        const cgYear = new Date(element.birthDate).getFullYear();
        const cgAge = thisYear - cgYear;
        element.age = cgAge;
        console.log(thisYear, cgYear, cgAge);

        // calculate joined date
        const today = new Date();
        const joinedDate = new Date(element.joinedDate);
        const days = Math.trunc((today.getTime() - joinedDate.getTime()) / (24 * 3600 * 1000));
        if (days === 1) {
          element.days = `${days} day`;
        } else if (days > 1) {
          element.days = `${days} days`;
        }
        if (days > 30) {
          const months = Math.trunc(days / 30);
          let monthsString: string;
          const daysLeft = days % 30;
          let daysLeftString: string;
          if (daysLeft > 0) {
            if (daysLeft === 1) {
              daysLeftString = '1 day';
            } else if (daysLeft > 1) {
              daysLeftString = `${daysLeft} days`;
            }
          }
          if (daysLeft === 0) {
            daysLeftString = '';
          }
          if (months === 1) {
            monthsString = '1 month';
          } else if (months > 1) {
            monthsString = `${months} months`;
          }
          element.days = monthsString + ' ' + daysLeftString;
        }
        console.log(element.days);
      });

      this.eLoading = false;
    });
  }

  setCertificate(index: number) {
    console.log(this.caregivers[index]);
    this.certificateValue = this.caregivers[index].certificate;
  }

  logout() {
    this.authService.logout();
  }

}
