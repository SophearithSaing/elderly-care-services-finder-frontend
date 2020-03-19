import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caregiver-experience',
  templateUrl: './caregiver-experience.component.html',
  styleUrls: ['./caregiver-experience.component.css']
})
export class CaregiverExperienceComponent implements OnInit {

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
  year;

  //experience
  workplace;
  startMonth;
  startYear;
  stopMonth;
  stopYear;

  readonly = false;

  text;

  constructor() {
    for (let year = 1960; year <= 2020; year++) {
      this.years.unshift(year);
    };
    console.log(this.years);
  }

  ngOnInit() {

  }

  readOnly() {
    this.readonly = true;
  }

}
