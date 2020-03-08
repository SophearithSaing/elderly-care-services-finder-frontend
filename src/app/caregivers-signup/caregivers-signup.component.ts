import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";


import { SearchService } from "../services/search.service";
import { Caregiver } from '../models/caregiver.model';
import { ActivatedRoute, ParamMap, Router, ROUTER_CONFIGURATION } from '@angular/router';
import { NgbDatepickerConfig, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-caregivers-signup',
  templateUrl: './caregivers-signup.component.html',
  styleUrls: ['./caregivers-signup.component.css']
})
export class CaregiversSignupComponent implements OnInit {

  caregiver: Caregiver;
  caregiverEmail: string;
  private mode = '';

  name = new FormControl('');
  // email = new FormControl('');
  birthDate = new FormControl('');
  tsDate: Date;
  gender = new FormControl('');
  houseNumber = new FormControl('');
  street = new FormControl('');
  subDistrict = new FormControl('');
  district = new FormControl('');
  province = new FormControl('');
  postalCode = new FormControl('');
  phoneNumber = new FormControl('');
  image = new FormControl('');

  query: any;
  email: string;

  imagePreview: string;
  imageFile: any;

  certificate = new FormControl('');
  certificatePreview: string;
  certificateFile: any;


  constructor(
    public searchService: SearchService, public route: ActivatedRoute, private router: Router,
    config: NgbDatepickerConfig, calendar: NgbCalendar, public http: HttpClient
  ) {
    config.minDate = { year: 1900, month: 1, day: 1 };
    config.maxDate = { year: 2020, month: 1, day: 31 };
  }

  ngOnInit() {

    // get query params
    this.route.queryParamMap.subscribe(params => {
      this.query = { ...params.keys, ...params };
    });

    this.mode = this.query.params.mode;
    console.log(this.mode);
    this.name.setValue(this.query.params.name);
    console.log(this.query);
    console.log(this.name.value);

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('caregiverEmail')) {
        this.email = paramMap.get('caregiverEmail');
      }
    });



    if (this.mode === 'update') {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has("caregiverEmail")) {
          this.email = paramMap.get("caregiverEmail");
          this.searchService.getCaregiver(this.email).subscribe((Data) => {
            console.log(this.email);
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
            this.name.setValue(this.caregiver.name);
            // this.birthDate.setValue(this.caregiver.birthDate);
            const newDate = new Date(this.caregiver.birthDate);
            this.birthDate.setValue(newDate);
            this.gender.setValue(this.caregiver.gender);
            this.houseNumber.setValue(this.caregiver.houseNumber);
            this.street.setValue(this.caregiver.street);
            this.subDistrict.setValue(this.caregiver.subDistrict);
            this.district.setValue(this.caregiver.district);
            this.province.setValue(this.caregiver.province);
            this.postalCode.setValue(this.caregiver.postalCode);
            this.phoneNumber.setValue(this.caregiver.phoneNumber);
            this.image.setValue(this.caregiver.imagePath);
          });

        }
      });
    }
    // this.form.setValue({
    // email: this.elder.email,
    // name: this.elder.name,
    // birthDate: this.elder.birthDate,
    // gender: this.elder.gender,
    // houseNumber: this.elder.houseNumber,
    // street: this.elder.street,
    // subDistrict: this.elder.subDistrict,
    // district: this.elder.district,
    // province: this.elder.province,
    // postalCode: this.elder.postalCode,
    // phoneNumber: this.elder.phoneNumber
    // })
  }
  show() {
    console.log(this.birthDate.value);
    this.tsDate = new Date(this.birthDate.value.year, this.birthDate.value.month - 1, this.birthDate.value.day);
    console.log(this.tsDate);
  }

  onImagePicked(event) {
    // const file = (event.target as HTMLInputElement).files[0];
    const file = event.target.files[0];
    this.imageFile = file;
    this.image.patchValue({ image: file });
    this.image.updateValueAndValidity();
    console.log(file);
    console.log(this.image);

    const Data = new FormData();
    Data.append('email', this.email);
    Data.append('upload', file);
    if (this.mode === 'add') {
      this.http.post(BACKEND_URL + 'upload', Data).subscribe((res) => {});
      console.log('post image ran for ' + this.email);
    } else {
      this.http.patch(BACKEND_URL + 'upload/' + this.email, Data).subscribe((res) => {});
      console.log('update image ran for ' + this.email);
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log(this.image.valid);
  }

  onCertificatePicked(event) {
    // const file = (event.target as HTMLInputElement).files[0];
    const file = event.target.files[0];
    this.certificateFile = file;
    this.certificate.patchValue({ certificate: file });
    this.certificate.updateValueAndValidity();
    console.log(file);
    console.log(this.certificate);

    const Data = new FormData();
    Data.append('email', this.email);
    Data.append('certificates', file);
    if (this.mode === 'add') {
      this.http.post(BACKEND_URL + 'certificates', Data).subscribe((res) => {});
      console.log('post file ran for ' + this.email);
    } else {
      this.http.post(BACKEND_URL + 'certificates', Data).subscribe((res) => {});
      // this.http.patch(BACKEND_URL + 'certificates/' + this.email, Data).subscribe((res) => {});
      console.log('update file ran for ' + this.email);
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.certificatePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log(this.certificate.valid);
  }

  goBack() {
    this.router.navigate(['/caregiver-profile']);
  }

  onSaveCaregiver() {
    // if (form.invalid) {
    //   return;
    // }
    if (this.mode === 'add') {
      this.tsDate = new Date(this.birthDate.value);
      this.searchService
        .addCaregiver(
          // form.value.name,
          // form.value.email,
          // form.value.password,
          // form.value.birthdate,
          // form.value.gender,
          // form.value.houseNumber,
          // form.value.street,
          // form.value.subDistrict,
          // form.value.district,
          // form.value.province,
          // form.value.postalCode,
          // form.value.phoneNumber,
          // form.value.services,
          // form.value.certificate,
          // form.value.experience,
          // form.value.dailyPrice,
          // form.value.monthlyPrice
          this.name.value,
          this.email,
          // this.birthDate.value,
          this.tsDate,
          this.gender.value,
          this.houseNumber.value,
          this.street.value,
          this.subDistrict.value,
          this.district.value,
          this.province.value,
          this.postalCode.value,
          this.phoneNumber.value,
          null,
          null,
          null,
          null,
          null,
          this.image.value,
          null,
          null
        );
      this.router.navigate(['/services', this.email]);
      console.log(this.router.navigate(['/services', this.email]));
    } else {
      this.tsDate = new Date(this.birthDate.value);
      this.searchService.UpdateCaregiver(
        this.caregiver._id,
        this.name.value,
        this.email,
        // this.birthDate.value,
        this.tsDate,
        this.gender.value,
        this.houseNumber.value,
        this.street.value,
        this.subDistrict.value,
        this.district.value,
        this.province.value,
        this.postalCode.value,
        this.phoneNumber.value,
        this.image.value,
      );
      console.log('updated');
      setTimeout(() => {
        this.router.navigate(['/caregiver-profile']);
      }, 2000);
    }
    // form.resetForm();
  }

}
