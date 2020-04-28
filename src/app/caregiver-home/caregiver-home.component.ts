import { Component, OnInit } from '@angular/core';
import { Caregiver } from '../models/caregiver.model';
import { AuthService } from '../auth/auth.service';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

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
  rejectionReason: string;

  requests: any;
  requestNumber = 0;

  constructor(public search: SearchService , public authService: AuthService, public router: Router, public admin: AdminService) { }

  ngOnInit() {
    this.email = this.authService.getUserId();

    this.search.getCaregiver(this.email).subscribe(data => {
      this.id = data._id;
      this.email = data.email;
      this.name = data.name;
      this.approval = data.approval;

      if (this.approval === false) {
        this.search.getCGRejection(this.email).subscribe(data => {
          this.rejectionReason = data.reason;
        });
      }
    });

    this.search.getRequests(this.email).subscribe((data) => {
      this.requests = data;
      console.log(this.requests);
      this.requests.forEach(element => {
        this.requestNumber = this.requestNumber + 1;
      });
    });
  }

  resubmitRequest() {
    this.admin.UpdateCGStatus(this.id, this.name, this.email, null);
    this.approval = null;
  }

  // editCalendar() {
  //   this.id = this.authService.getUserId();
  //   console.log('id is ' + this.id);
  //   this.router.navigate(['/calendar/' + this.id]);
  // }
}
