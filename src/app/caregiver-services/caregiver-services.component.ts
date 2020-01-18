import { Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { SearchService } from '../services/search.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-caregiver-services',
  templateUrl: './caregiver-services.component.html',
  styleUrls: ['./caregiver-services.component.css']
})
export class CaregiverServicesComponent implements OnInit {

  email = 'sophearithgiver@gmail.com';

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
  dailyPrice;
  monthlyPrice;

  constructor(public searchservice: SearchService, public http: HttpClient, private router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('email')) {
        this.email = paramMap.get('email');
      }
    });
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
        .patch("http://localhost:3000/api/caregivers/" + email, caregiver)
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
    this.router.navigate(['/caregiver-home']);
  }



}
