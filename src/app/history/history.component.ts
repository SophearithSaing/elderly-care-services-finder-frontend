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
  review;
  elderEmail;
  history;

  startDate: Date;
  stopDate: Date;

  isoStart;
  isoStop;
  constructor(config: NgbRatingConfig, public authService: AuthService, public search: SearchService) {
    // customize default values of ratings used by this component tree
    config.max = 5;
  }

  ngOnInit() {
    this.elderEmail = this.authService.getUserId();
    // this.elderEmail = 'john@mail.com';

    this.search.getHistory(this.elderEmail).subscribe((data) => {
      this.history = data;
      console.log(this.history);
      this.isoStart = new Date(this.startDate).toISOString();
      this.isoStop = new Date(this.stopDate).toISOString();
    });

  }

  saveReview(item, rating, review) {
    this.currentRate = rating;
    console.log(this.currentRate);
    console.log(review);
    this.search.updateHistory(item, rating, review);
  }

}
