import { Component, OnInit } from '@angular/core';
import { AdmminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  requestNumber = 0;
  unapproved: Array<any> = [];
  seeRequest = false;
  panelOpenState = false;
  reason: string = null;

  accept = true;
  name: string;
  email: string;
  show = false;

  constructor(private admin: AdmminService) { }

  ngOnInit() {
    this.admin.GetCaregivers().subscribe((data) => {
      const caregivers = data.users;
      let count = 0;
      caregivers.forEach(element => {
        console.log(element);
        if (element.approval === null) {
          count++;
          this.unapproved.push(element);
        }
      });
      this.requestNumber = count;
      console.log(count);
      console.log(this.unapproved);
    });
  }

  openRequest() {
    this.seeRequest = true;
  }

  closeRequest() {
    this.seeRequest = false;
  }

  acceptRequest(email: string) {
    this.admin.UpdateCGStatus(email, true);
    this.accept = true;
  }

  rejectRequest(email: string) {
    this.accept = false;
    this.admin.UpdateCGStatus(email, false);
    this.admin.AddReason(email, this.reason);
    console.log(this.reason);
  }

  setValue(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  reload() {
    location.reload();
  }

}
