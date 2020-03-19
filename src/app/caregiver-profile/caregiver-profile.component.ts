import { Component, OnInit } from '@angular/core';
import { Caregiver } from '../models/caregiver.model';
import { SearchService } from '../services/search.service';
import { AuthService } from '../auth/auth.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-caregiver-profile',
  templateUrl: './caregiver-profile.component.html',
  styleUrls: ['./caregiver-profile.component.css']
})
export class CaregiverProfileComponent implements OnInit {

  months = [
    'Januray',
    'Februay',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  years = [];

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
  // certificate: string;
  experience: Array<any>;
  dailyPrice: number;
  monthlyPrice: number;
  imagePath: string;

  year = new Date().getFullYear();
  age;
  id;

  isLoading: boolean;
  editingExperience: boolean;

  // experiences = [
  //   {
  //     workplace: 'hospital a',
  //     startMonth: 'January',
  //     startYear: '2000',
  //     stopMonth: 'February',
  //     stopYear: '2005'
  //   },
  //   {
  //     workplace: 'hospital b',
  //     startMonth: 'January',
  //     startYear: '2005',
  //     stopMonth: 'February',
  //     stopYear: '2008'
  //   },
  //   {
  //     workplace: 'hospital c',
  //     startMonth: 'January',
  //     startYear: '2008',
  //     stopMonth: 'February',
  //     stopYear: '2019'
  //   }
  // ];
  experiences = [];
  numberOfExperience = 0;

  editIndex: number;

  workplace;
  startMonth;
  startYear;
  stopMonth;
  stopYear;

  certificate = new FormControl('');
  certificatePreview: string;
  certificateFile: any;


  constructor(public searchService: SearchService, public authService: AuthService, public router: Router, private http: HttpClient) {
    for (let year = 1960; year <= 2020; year++) {
      this.years.unshift(year);
    }
    for (let index = 0; index < this.experiences.length; index++) {
      this.numberOfExperience += 1;
    }
    console.log(this.numberOfExperience);
  }

  ngOnInit() {
    this.caregiverEmail = this.authService.getUserId();

    this.isLoading = true;

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
        imagePath: Data.imagePath,
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
      // this.certificate = this.caregiver.certificate;
      this.experience = this.caregiver.experience;
      this.dailyPrice = this.caregiver.dailyPrice;
      this.monthlyPrice = this.caregiver.monthlyPrice;
      this.imagePath = this.caregiver.imagePath;
      this.experiences = this.caregiver.experience;

      if (this.experiences === null) {
        // this.experiences = [];
        this.experiences = [
          {
            workplace: 'hospital a',
            startMonth: 'January',
            startYear: '2000',
            stopMonth: 'February',
            stopYear: '2005'
          },
          {
            workplace: 'hospital b',
            startMonth: 'January',
            startYear: '2005',
            stopMonth: 'February',
            stopYear: '2008'
          },
          {
            workplace: 'hospital c',
            startMonth: 'January',
            startYear: '2008',
            stopMonth: 'February',
            stopYear: '2019'
          }
        ];
      };

      console.log(this.caregiver);
      this.isLoading = false;
    });
  }

  edit() {
    this.router.navigate(
      ['/caregiver-register', this.caregiverEmail],
      { queryParams: { mode: 'update', name: this.name } }
    );
  }

  add() {
    this.experiences.unshift({
      workplace: '',
      startMonth: '',
      startYear: '',
      stopMonth: '',
      stopYear: ''
    });
    console.log(this.experiences);
    this.setValue(0);
  }

  setValue(index) {
    this.editIndex = index;
    this.workplace = this.experiences[index].workplace;
    this.startMonth = this.experiences[index].startMonth;
    this.startYear = this.experiences[index].startYear;
    this.stopMonth = this.experiences[index].stopMonth;
    this.stopYear = this.experiences[index].stopYear;
    this.experiences[index].editing = true;
  }

  cancelEdit(index) {
    this.experiences[index].editing = false;
  }

  saveValue() {
    console.log(this.experiences);
    console.log(this.editIndex);
    console.log(this.experiences[this.editIndex]);
    this.experiences[this.editIndex] = this.experiences[this.editIndex]
    // this.experiences[this.editIndex].workplace = this.workplace;
    // this.experiences[this.editIndex].startMonth = this.startMonth;
    // this.experiences[this.editIndex].startYear = this.startYear;
    // this.experiences[this.editIndex].stopMonth = this.stopMonth;
    // this.experiences[this.editIndex].stopYear = this.stopYear;
    console.log(this.experiences);
    this.experiences[this.editIndex].editing = false;
    this.saveExperience();
  }

  saveExperience() {
    const experiences = {
      email: this.caregiverEmail,
      experiences: this.experiences
    };
    console.log(experiences);
    this.http.patch(BACKEND_URL + "experiences", experiences).subscribe(response => { });
  }



  // editCalendar() {
  //   this.id = this.authService.getUserId();
  //   console.log('id is ' + this.id);
  //   this.router.navigate(['/calendar/' + this.id]);
  // }

}

