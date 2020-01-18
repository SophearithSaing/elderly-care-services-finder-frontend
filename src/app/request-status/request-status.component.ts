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
    this.elderEmail = 'elderemail@gmail.com';

    this.search.getRequests(this.elderEmail).subscribe((data) => {
      this.requests = data;
      console.log(this.requests);
    });
  }

}
