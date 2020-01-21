import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../auth/auth.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  currentRate = 0;
  review: string;
  rating: number;
  elderEmail;
  history;

  startDate: Date;
  stopDate: Date;

  isoStart;
  isoStop;

  reviewed = false;
  constructor(config: NgbRatingConfig, public authService: AuthService, public search: SearchService) {
    // customize default values of ratings used by this component tree
    config.max = 5;
  }

  ngOnInit() {
    // this.elderEmail = this.authService.getUserId();
    this.elderEmail = 'john@mail.com';

    this.search.getHistory(this.elderEmail).subscribe((data) => {
      this.history = data;
      console.log(this.history);
      // this.isoStart = new Date(this.startDate).toISOString();
      // this.isoStop = new Date(this.stopDate).toISOString();
      this.history.forEach(element => {
        const startDate = new Date(element.startDate);
        const stopDate = new Date(element.stopDate);
        // const newElement = {
        //   startDate: `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`,
        //   stopDate: `${stopDate.getDate()}/${stopDate.getMonth() + 1}/${stopDate.getFullYear()}`
        // };
        element.startDate = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
        element.stopDate = `${stopDate.getDate()}/${stopDate.getMonth() + 1}/${stopDate.getFullYear()}`;
        // this.availabilityString.push(newElement);
      });
      console.log(this.history);
    });

  }

  saveReview(item, rating, review) {
    this.currentRate = rating;
    console.log(this.currentRate);
    console.log(review);
    this.search.updateHistory(item, rating, review);

    // this.reviewed = true;
    // this.rating = rating;
    // this.review = review;
    item.rating = rating;
    item.review = review;
  }

}
