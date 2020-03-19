import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.css']
})
export class RequestStatusComponent implements OnInit {

  requests: any;
  elderEmail: string;

  index;
  id;

  isLoading: boolean;

  constructor(public search: SearchService, public authService: AuthService) { }

  ngOnInit() {
    this.elderEmail = this.authService.getUserId();
    // this.elderEmail = 'elderemail@gmail.com';

    this.isLoading = true;

    this.search.getRequestsStatus(this.elderEmail).subscribe((data) => {
      this.requests = data;
      console.log(this.requests);

      this.requests.forEach(element => {
        const startDate = new Date(element.startDate);
        const stopDate = new Date(element.stopDate);
        const sentDate = new Date(element.dateSent);
        const startDateString = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
        const stopDateString = `${stopDate.getDate()}/${stopDate.getMonth() + 1}/${stopDate.getFullYear()}`;
        element.startDate = startDateString;
        element.stopDate = stopDateString;

        if (element.selectedServices === undefined) {
          element.selectedServices = {
            dailyCare: 'none',
            specialCare: 'none'
          };
        };

        const date = new Date();
        const msAgo = date.getTime() - sentDate.getTime();
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
        this.isLoading = false;
      });
      this.requests = this.requests.reverse();
    });
  }

  setValue(id, index) {
    this.index = index;
    this.id = id;
  }

  cancel() {
    this.search.cancelRequest(this.id);
    console.log('cancelling id ' + this.id);
    this.requests.splice(this.index, 1);
  }

}
