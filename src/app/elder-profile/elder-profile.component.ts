import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Elder } from '../models/elder.model';
import { AuthService } from '../auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-elder-profile',
  templateUrl: './elder-profile.component.html',
  styleUrls: ['./elder-profile.component.css']
})
export class ElderProfileComponent implements OnInit {

  elder;
  elderEmail: string;
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
  age;

  isLoading: boolean;


  constructor(public searchService: SearchService, public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.elderEmail = this.authService.getUserId();

    this.isLoading = true;

    this.searchService.getElder(this.elderEmail).subscribe((Data) => {
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

      this.isLoading = false;
    });
  }

  edit() {
    this.router.navigate(
      ['/elder-register', this.elderEmail],
      { queryParams: { mode: 'update', name: this.name } }
      );
  }

}
