import { Component, OnInit } from '@angular/core';
import { Caregiver } from '../models/caregiver.model';
import { AuthService } from '../auth/auth.service';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caregiver-home',
  templateUrl: './caregiver-home.component.html',
  styleUrls: ['./caregiver-home.component.css']
})
export class CaregiverHomeComponent implements OnInit {

  id: string;
  caregiver: Caregiver;
  email: string;
  name: string;
  approval: boolean;

  requests: any;
  requestNumber = 0;

  constructor(public search: SearchService , public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.email = this.authService.getUserId();

    this.search.getCaregiver(this.email).subscribe(data => {
      this.name = data.name;
      this.approval = data.approval;
    });

    this.search.getRequests(this.email).subscribe((data) => {
      this.requests = data;
      console.log(this.requests);
      this.requests.forEach(element => {
        this.requestNumber = this.requestNumber + 1;
      });
    });
  }
  // editCalendar() {
  //   this.id = this.authService.getUserId();
  //   console.log('id is ' + this.id);
  //   this.router.navigate(['/calendar/' + this.id]);
  // }
}
