import { Component, OnInit } from '@angular/core';
import { Caregiver } from '../models/caregiver.model';
import { SearchService } from '../services/search.service';
import { AuthService } from '../auth/auth.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caregiver-profile',
  templateUrl: './caregiver-profile.component.html',
  styleUrls: ['./caregiver-profile.component.css']
})
export class CaregiverProfileComponent implements OnInit {

  caregiver: Caregiver;
  caregiverEmail: string;
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
  services: string;
  certificate: string;
  experience: string;
  dailyPrice: number;
  monthlyPrice: number;

  year = new Date().getFullYear();
  age;

  constructor(public searchService: SearchService, public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.caregiverEmail = this.authService.getUserId();
    this.searchService.getCaregiver(this.caregiverEmail).subscribe((Data) => {
      console.log(Data);
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
        services: Data.services,
        certificate: Data.certificate,
        experience: Data.experience,
        dailyPrice: Data.dailyPrice,
        monthlyPrice: Data.monthlyPrice,
        imagePath: null,
        schedule: null,
        approval: null
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
      this.services = this.caregiver.services;
      this.certificate = this.caregiver.certificate;
      this.experience = this.caregiver.experience;
      this.dailyPrice = this.caregiver.dailyPrice;
      this.monthlyPrice = this.caregiver.monthlyPrice;

      console.log(this.caregiver);
    });
  }

  edit() {
    this.router.navigate(
      ['/caregiver-register', this.caregiverEmail],
      { queryParams: { mode: 'update', name: this.name } }
      );
  }

}

