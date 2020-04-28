import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { SearchService } from '../services/search.service';

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
  id: string;
  email: string;
  name: string;
  show = false;

  certificateValue: string;

  constructor(private admin: AdminService, private search: SearchService) { }

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

      this.unapproved.forEach(element => {
        // calculate age
        const thisYear = new Date().getFullYear();
        const cgYear = new Date(element.birthDate).getFullYear();
        const cgAge = thisYear - cgYear;
        element.age = cgAge;
        console.log(thisYear, cgYear, cgAge);

        this.search.getCGRejection(element.email).subscribe(data => {
          if (data.reason !== null) {
            element.reason = data.reason;
          } else {
            element.reason = null;
          }
        });

      });
    });
  }

  openRequest() {
    this.seeRequest = true;
  }

  closeRequest() {
    this.seeRequest = false;
  }

  acceptRequest(email: string) {
    this.admin.UpdateCGStatus(this.id, email, this.name, true);
    this.accept = true;
  }

  rejectRequest(email: string) {
    this.accept = false;
    if (this.reason === null) {
      this.reason = '';
    }
    this.admin.UpdateCGStatus(this.id, email, this.name, false);
    this.search.getCGRejection(email).subscribe(data => {
      if (data.reason === null) {
        this.admin.AddReason(email, this.name, this.reason);
      } else {
        this.admin.UpdateReason(email, this.name, this.reason);
      }
    });
    console.log(this.reason);
  }

  setValue(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  setCertificate(index) {
    console.log(this.unapproved[index]);
    this.certificateValue = this.unapproved[index].certificate;
  }

  reload() {
    location.reload();
  }

}
