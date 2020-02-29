import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-caregiver-history',
  templateUrl: './caregiver-history.component.html',
  styleUrls: ['./caregiver-history.component.css']
})
export class CaregiverHistoryComponent implements OnInit {

  elderEmail;
  caregiverEmail;
  history;

  startDate: Date;
  stopDate: Date;

  isoStart;
  isoStop;


  constructor(config: NgbRatingConfig, public authService: AuthService, public search: SearchService) {
    config.max = 5;
  }

  ngOnInit() {
    this.caregiverEmail = this.authService.getUserId();

    this.search.getHistory(this.caregiverEmail).subscribe((data) => {
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

        const date = new Date();
        const msAgo = date.getTime() - stopDate.getTime();
        // const daysAgo = (msAgo / 86400000).toFixed(0);
        const daysAgo = Math.trunc(msAgo / 86400000);
        // daysAgo = daysAgo.toFixed(0);
        // Math.trunc(daysAgo);
        element.daysAgo = daysAgo;
        if (daysAgo > 30) {
          const monthsAgo = Math.trunc(daysAgo / 30);
          if (monthsAgo === 1) {
            element.monthsAgo = `${monthsAgo} month`;
          } else if (monthsAgo > 1) {
            element.monthsAgo = `${monthsAgo} months`;
          }
          let newDaysAgo;
          if (daysAgo % 30 > 0) {
              newDaysAgo = daysAgo % 30;
              let stringNewDaysAgo;
              if (newDaysAgo === 1) {
                stringNewDaysAgo = `${newDaysAgo} day`;
              } else if (newDaysAgo > 1) {
                stringNewDaysAgo = `${newDaysAgo} days`;
              }
              element.monthsAgo = element.monthsAgo + ' and ' + stringNewDaysAgo;
            }
        }
      });
      console.log(this.history);
    });
  }

}
