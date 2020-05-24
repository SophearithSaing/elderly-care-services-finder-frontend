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
    console.log(this.elderEmail);

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
        }

        // calculate days ago
        const today = new Date();
        // const joinedDate = new Date(element.joinedDate);
        const days = Math.trunc((today.getTime() - sentDate.getTime()) / (24 * 3600 * 1000));
        element.daysAgo = days;
        console.log(element);
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
          element.monthsAgo = monthsString + ' ' + daysLeftString;
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
