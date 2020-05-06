import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-elder-home',
  templateUrl: './elder-home.component.html',
  styleUrls: ['./elder-home.component.css']
})
export class ElderHomeComponent implements OnInit {

  // verify before search
  hasDate: boolean;
  hasPostalCode: boolean;
  hasServices: boolean;

  panelOpenState = false;
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  startDate: Date;
  stopDate: Date;
  postalCode: string;

  form: FormControl;

  email: string;
  name: string;

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

  searchButton = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private auth: AuthService,
    private breakpointObserver: BreakpointObserver,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    public searchService: SearchService,
    public router: Router
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.email = this.auth.getUserId();
    this.searchService.getElder(this.email).subscribe(data => {
      // console.log(data);
      this.name = data.name;
    });
    console.log(this.postalCode);
  }

  openSearch() {
    this.searchButton = true;
  }

  closeSearch() {
    this.searchButton = false;
  }

  toggle(event) {
    console.log(event);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  search(form: NgForm) {
    this.startDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    this.stopDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
    this.postalCode = form.value.postalCode;
    this.services = {
      dailyCare: this.newDailyCare,
      specialCare: this.newSpecialCare
    };
    console.log(this.postalCode);
    console.log('start from ' + this.startDate + ' to ' + this.stopDate);

    if (this.startDate === null || this.stopDate === null) {
      this.hasDate = false;
    } else if (this.postalCode === null || this.postalCode === undefined) {
      this.hasPostalCode = false;
    } else if (this.newDailyCare === null || this.newSpecialCare) {
      this.hasServices = false;
    }
    console.log(this.postalCode);
    if (
      this.hasDate !== false &&
      this.hasPostalCode !== false &&
      this.hasServices !== false) {
      this.router.navigate(
        ['/result'],
        { queryParams: {
          postalCode: this.postalCode,
          startDate: this.startDate,
          stopDate: this.stopDate,
          dailyCare: this.newDailyCare,
          specialCare: this.newSpecialCare } }
      );
    }
    // this.searchService.searchCaregivers(this.postalCode, this.startDate, this.stopDate, this.services);
  }

  getCheckboxes() {
    console.log(this.dailyCare.filter(x => x.checked === true).map(x => x.name));
    this.newDailyCare = this.dailyCare.filter(x => x.checked === true).map(x => x.name);

    console.log(this.specialCare.filter(x => x.checked === true).map(x => x.name));
    this.newSpecialCare = this.specialCare.filter(x => x.checked === true).map(x => x.name);
  }

}
