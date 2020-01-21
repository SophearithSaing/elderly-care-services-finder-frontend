import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { AuthService } from '../auth/auth.service';
import { AdminService } from '../services/admin.service';

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

  email: string;
  id: string;
  cgName: string;

  caregiver: any;
  name: string;
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

  constructor(private search: SearchService, private auth: AuthService, private admin: AdminService) { }

  ngOnInit() {
    this.caregiverEmail = this.auth.getUserId();
    // this.caregiverEmail = 'sophearithsaing123@gmail.com';

    this.search.getRequests(this.caregiverEmail).subscribe((data) => {
      this.requests = data;
      console.log(this.requests);
    });
  }

  getCG(email: string) {
    this.search.getCaregiver(email).subscribe((Data) => {
      this.caregiver = {
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
      this.name = this.caregiver.name;
      this.birthDate = this.caregiver.birthDate;
      const birthYear = new Date(this.caregiver.birthDate).getFullYear();
      this.age = this.year - birthYear;
      this.gender = this.caregiver.gender;
      this.houseNumber = this.caregiver.houseNumber;
      this.street = this.caregiver.street;
      this.subDistrict = this.caregiver.subDistrict;
      this.district = this.caregiver.district;
      this.province = this.caregiver.province;
      this.postalCode = this.caregiver.postalCode;
      this.phoneNumber = this.caregiver.phoneNumber;

      console.log(this.caregiver);

    });
  }

  setValue(id, email, name) {
    this.id = id;
    this.email = email;
    this.cgName = name;
  }

  acceptRequest() {
    this.admin.UpdateCGStatus(this.id, this.email, true);
  }

  rejectRequest(item) {
    this.accept = false;
    if (this.reason === null) {
      this.reason = '';
    }
    console.log(this.reason);
    this.admin.UpdateCGStatus(this.id, this.email, true);
    this.admin.AddReason(this.email, this.reason);
    console.log(item);
  }

}
