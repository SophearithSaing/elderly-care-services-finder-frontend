import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-approval',
  templateUrl: './admin-approval.component.html',
  styleUrls: ['./admin-approval.component.css']
})
export class AdminApprovalComponent implements OnInit {

  accept = true;
  panelOpenState = false;
  caregiverEmail: string;

  requests: any;
  elderProfile: any;
  elderEmail: string;

  elder: any;
  name: string;
  email: string;
  birthDate: Date;
  gender: string;
  houseNumber: string;
  street: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  phoneNumber: string;

  year = new Date().getFullYear();
  age: number;

  reason: string = null;

  constructor(private search: SearchService, private auth: AuthService) { }

  ngOnInit() {
        // this.caregiverEmail = this.authService.getUserId();
        this.caregiverEmail = 'sophearithsaing123@gmail.com';

        this.search.getRequests(this.caregiverEmail).subscribe((data) => {
          this.requests = data;
          console.log(this.requests);
        });
  }

  getCG(){

  }

  acceptRequest(item) {
    this.search.updateRequest(item, true, null);
    console.log(item);
  }

  rejectRequest(item) {
    this.accept = false;
    if (this.reason === null) {
      this.reason = '';
    }
    console.log(this.reason);
    this.search.updateRequest(item, false, this.reason);
    console.log(item);
  }

}
