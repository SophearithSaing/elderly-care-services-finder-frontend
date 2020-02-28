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

  constructor(public search: SearchService, public authService: AuthService) { }

  ngOnInit() {
    this.elderEmail = this.authService.getUserId();
    // this.elderEmail = 'elderemail@gmail.com';

    this.search.getRequestsStatus(this.elderEmail).subscribe((data) => {
      this.requests = data;
      console.log(this.requests);

      this.requests.forEach(element => {
        const startDate = new Date(element.startDate);
        const stopDate = new Date(element.stopDate);
        const startDateString = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
        const stopDateString = `${stopDate.getDate()}/${stopDate.getMonth() + 1}/${stopDate.getFullYear()}`;
        element.startDate = startDateString;
        element.stopDate = stopDateString;
      });
    });
  }

}
