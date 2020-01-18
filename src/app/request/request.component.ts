import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SearchService } from '../services/search.service';

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

  year = new Date().getFullYear();
  age: number;

  reason: string = null;

  constructor(public authService: AuthService, public search: SearchService) { }

  ngOnInit() {
    // this.caregiverEmail = this.authService.getUserId();
    this.caregiverEmail = 'sophearithsaing123@gmail.com';

    this.search.getRequests(this.caregiverEmail).subscribe((data) => {
      this.requests = data;
      console.log(this.requests);
    });
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
        imagePath: null
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

      console.log(this.elder);
  });
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
