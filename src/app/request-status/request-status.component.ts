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
        const startDateString = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
        const stopDateString = `${stopDate.getDate()}/${stopDate.getMonth() + 1}/${stopDate.getFullYear()}`;
        element.startDate = startDateString;
        element.stopDate = stopDateString;

        this.isLoading = false;
      });
    });
  }

  cancel(id, index) {
    this.search.cancelRequest(id);
    console.log('cancelling id ' + id);
    this.requests.splice(index, 1);
  }

}
