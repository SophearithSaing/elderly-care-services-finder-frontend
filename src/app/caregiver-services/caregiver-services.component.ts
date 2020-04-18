import { Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { SearchService } from '../services/search.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-caregiver-services',
  templateUrl: './caregiver-services.component.html',
  styleUrls: ['./caregiver-services.component.css']
})
export class CaregiverServicesComponent implements OnInit {

  // email = 'sophearithgiver@gmail.com';
  email;
  caregiverEmail;

  dailyCare = [
    {
      name: 'Bathroom Assistance',
      checked: false
    },
    {
      name: 'Dressing Assitance',
      checked: false
    },
    {
      name: 'Meals',
      checked: false
    },
    {
      name: 'Joyful Companionship',
      checked: false
    }
  ];

  specialCare = [
    {
      name: 'Rehabilitation',
      checked: false
    },
    {
      name: 'Medicine',
      checked: false
    }

  ];

  newDailyCare;
  newSpecialCare;
  services;
  dailyPrice: number;
  monthlyPrice: number;

  checkedDailyCare;
  checkedSpecialCare;

  editingExperience: boolean;
  experiences = [];
  numberOfExperience = 0;

  editIndex: number;

  workplace;
  startMonth;
  startYear;
  stopMonth;
  stopYear;

  mode = 'update';

  certificate = new FormControl('');
  certificatePreview: string;
  certificateFile: any;

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
  stopYears = [];
  currentStartYear;
  invalidStopYear: boolean;

  isLoading: boolean;

  constructor(
    public searchservice: SearchService,
    public http: HttpClient,
    private router: Router,
    public route: ActivatedRoute,
    private auth: AuthService) {
    for (let year = 1960; year <= 2020; year++) {
      this.years.unshift(year);
    }
    for (let index = 0; index < this.experiences.length; index++) {
      this.numberOfExperience += 1;
    }
  }

  ngOnInit() {
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has('email')) {

    //   }
    // });

    this.email = this.auth.getUserId();
    this.caregiverEmail = this.email;
    this.searchservice.getCaregiver(this.email).subscribe(data => {
      console.log(data);
      this.experiences = data.experience;
      this.certificate.setValue(data.certificate);
      this.dailyPrice = data.dailyPrice;
      this.monthlyPrice = data.monthlyPrice;
      this.checkedDailyCare = data.services.dailyCare;
      this.checkedSpecialCare = data.services.specialCare;
      console.log(this.checkedDailyCare);
      console.log(this.checkedSpecialCare);
      this.checkedDailyCare.forEach(element => {
        console.log(element);
        this.dailyCare.forEach(item => {
          if (item.name === element) {
            console.log(item.name + ' = ' + element);
            item.checked = true;
          }
        });
      });
      this.checkedSpecialCare.forEach(element => {
        this.specialCare.forEach(item => {
          if (item.name === element) {
            console.log(item.name + ' = ' + element);
            item.checked = true;
          }
        });
      });
    });
  }

  getStopYears() {
    const startYear = this.experiences[this.editIndex].startYear;
    for (let year = startYear; year <= 2020; year++) {
      this.stopYears.unshift(year);
    }
  }

  getCheckboxes() {
    console.log(this.dailyCare.filter(x => x.checked === true).map(x => x.name));
    this.newDailyCare = this.dailyCare.filter(x => x.checked === true).map(x => x.name);

    console.log(this.specialCare.filter(x => x.checked === true).map(x => x.name));
    this.newSpecialCare = this.specialCare.filter(x => x.checked === true).map(x => x.name);
  }

  UpdatePriceServices(
    email: string,
    services: any,
    dailyPrice: number,
    monthlyPrice: number,
  ) {
    let id;
    this.searchservice.getCaregiver(this.email).subscribe((data) => {
      id = data._id;
      console.log(id);
      const caregiver = {
        _id: id,
        email: email,
        services: services,
        dailyPrice: dailyPrice,
        monthlyPrice: monthlyPrice,
      };
      console.log(caregiver);
      this.http
        .patch(BACKEND_URL + "caregivers/" + email, caregiver)
        .subscribe(response => {
          // const updatedCaregiver = [...this.caregivers];
          // const oldIndex = updatedCaregiver.findIndex(u => u._id === caregiver._id);
          // updatedCaregiver[oldIndex] = caregiver;
          // this.caregivers = updatedCaregiver;
          // this.caregiverUpdated.next([...this.caregivers]);
        });
    });
  }

  save() {
    console.log(this.newDailyCare);
    console.log(this.newSpecialCare);
    this.services = {
      dailyCare: this.newDailyCare,
      specialCare: this.newSpecialCare
    };
    console.log(this.dailyPrice);
    console.log(this.monthlyPrice);
    console.log(this.services);
    this.UpdatePriceServices(this.email, this.services, this.dailyPrice, this.monthlyPrice);
    // this.router.navigate(['/caregiver-login']);
  }

  add() {
    if (this.experiences === null) {
      this.experiences = [];
    }
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
    // this.experiences[this.editIndex] = this.experiences[this.editIndex];
    // this.experiences[this.editIndex].workplace = this.workplace;
    // this.experiences[this.editIndex].startMonth = this.startMonth;
    // this.experiences[this.editIndex].startYear = this.startYear;
    // this.experiences[this.editIndex].stopMonth = this.stopMonth;
    // this.experiences[this.editIndex].stopYear = this.stopYear;
    const item = this.experiences[this.editIndex];
    if (item.startYear > item.stopYear) {
      console.log(item.startYear, item.stopYear);
      this.invalidStopYear = true;
      console.log(this.invalidStopYear, this.invalidStopYear === true);
    } else {
      console.log(this.experiences);
      this.invalidStopYear = false;
      this.experiences[this.editIndex].editing = false;
      this.saveExperience();
    }
  }

  saveExperience() {
    const experiences = {
      email: this.caregiverEmail,
      experiences: this.experiences
    };
    console.log(experiences);
    this.http.patch(BACKEND_URL + "experiences", experiences).subscribe(response => { });
  }

  deleteExperience(index) {
    this.experiences.splice(index, 1);
    this.saveExperience();
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
    Data.append('certificate', file);

    // if (this.mode === 'add') {
    //   this.http.post(BACKEND_URL + 'certificates', Data).subscribe((res) => {});
    //   console.log('post file ran for ' + this.email);
    // } else {
    //   this.http.post(BACKEND_URL + 'certificates', Data).subscribe((res) => {});
    //   // this.http.patch(BACKEND_URL + 'certificates/' + this.email, Data).subscribe((res) => {});
    //   console.log('update file ran for ' + this.email);
    // }

    console.log(Data);

    this.http.patch(BACKEND_URL + 'certificates/' + this.email, Data).subscribe((res) => {});
    console.log('update file ran for ' + this.email);

    const reader = new FileReader();
    reader.onload = () => {
      this.certificatePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log(this.certificate.valid);
  }



}
