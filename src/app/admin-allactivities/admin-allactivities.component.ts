import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-allactivities',
  templateUrl: './admin-allactivities.component.html',
  styleUrls: ['./admin-allactivities.component.css']
})
export class AdminAllactivitiesComponent implements OnInit {

  history: any;
  isLoading: boolean;

  constructor(config: NgbRatingConfig, private search: SearchService) {
    config.max = 5;
   }

  ngOnInit() {
    this.isLoading = true;

    this.search.getAllHistory().subscribe(data => {
      this.history = data.history;

      this.history.forEach(element => {
        console.log(element);
        const startDate = new Date(element.startDate);
        const stopDate = new Date(element.stopDate);
        const startDateString = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
        const stopDateString = `${stopDate.getDate()}/${stopDate.getMonth() + 1}/${stopDate.getFullYear()}`;
        element.startDate = startDateString;
        element.stopDate = stopDateString;

        element.totalDays = Math.trunc((stopDate.getTime() - startDate.getTime()) / 86400000);
        console.log(element.totalDays);
        element.totalPrice = element.totalDays * element.selectedDP;
        console.log(element.totalPrice);

        if (element.selectedServices === undefined) {
          element.selectedServices = {
            dailyCare: 'none',
            specialCare: 'none'
          };
        };

        const date = new Date();
        const msAgo = date.getTime() - stopDate.getTime();
        const daysAgo = Math.trunc(msAgo / 86400000);
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
      // this.history.sort((a, b) => (a.daysAgo > b.daysAgo) ? 1 : -1);
      this.isLoading = false;
    });
  }

}
