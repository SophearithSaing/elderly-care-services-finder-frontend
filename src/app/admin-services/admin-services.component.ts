import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css']
})
export class AdminServicesComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

  getCheckboxes() {
    console.log(this.dailyCare.filter(x => x.checked === true).map(x => x.name));
    this.newDailyCare = this.dailyCare.filter(x => x.checked === true).map(x => x.name);

    console.log(this.specialCare.filter(x => x.checked === true).map(x => x.name));
    this.newSpecialCare = this.specialCare.filter(x => x.checked === true).map(x => x.name);
  }

}
