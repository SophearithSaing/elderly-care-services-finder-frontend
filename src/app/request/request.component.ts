import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

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
  imagePath: string;

  year = new Date().getFullYear();
  age: number;

  reason: string = null;
  caregiverName;

  requestNumber = 0;

  id;

  item;

  constructor(public authService: AuthService, public search: SearchService, private router: Router) { }

  ngOnInit() {
    this.caregiverEmail = this.authService.getUserId();
    // this.caregiverEmail = 'sophearithsaing123@gmail.com';
    console.log(this.caregiverEmail);

    this.search.getCaregiver(this.caregiverEmail).subscribe((data) => {
      this.caregiverName = data.name;
    });

    this.search.getRequests(this.caregiverEmail).subscribe((data) => {
      this.requests = data;
      console.log(this.requests);
      this.requests.forEach(element => {
        this.requestNumber = this.requestNumber + 1;
      });
    });


  }

  editCalendar() {
    this.id = this.authService.getUserId();
    console.log('id is ' + this.id);
    this.router.navigate(['/calendar/' + this.id]);
  }

  getElder(email) {
    this.search.getElder(email).subscribe((Data) => {
      this.elder = {
        _id: Data._id,
        name: Data.name,
        email: Data.email,
        birthDate: Data.birthDate,
        gender: Data.gender,
        houseNumber: Data.houseNumber,
        street: Data.street,
        subDistrict: Data.subDistrict,
        district: Data.district,
        province: Data.province,
        postalCode: Data.postalCode,
        phoneNumber: Data.phoneNumber,
        imagePath: Data.imagePath
      };
      this.name = this.elder.name;
      this.birthDate = this.elder.birthDate;
      const birthYear = new Date(this.elder.birthDate).getFullYear();
      this.age = this.year - birthYear;
      this.gender = this.elder.gender;
      this.houseNumber = this.elder.houseNumber;
      this.street = this.elder.street;
      this.subDistrict = this.elder.subDistrict;
      this.district = this.elder.district;
      this.province = this.elder.province;
      this.postalCode = this.elder.postalCode;
      this.phoneNumber = this.elder.phoneNumber;
      this.imagePath = this.elder.imagePath;

      console.log(this.elder);
  });
}

  setItem(item) {
    this.item = item;
  }

  acceptRequest(elderName) {
    this.search.updateRequest(this.item, elderName, this.caregiverName, true, null);
    console.log(this.item);
  }

  rejectRequest(item, elderName) {
    this.accept = false;
    if (this.reason === null) {
      this.reason = '';
    }
    console.log(this.reason);
    this.search.updateRequest(item, elderName, this.caregiverName, false, this.reason);
    console.log(item);
  }

  reload() {
    location.reload();
  }

}
