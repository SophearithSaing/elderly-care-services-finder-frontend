import { Component, OnInit } from '@angular/core';

import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from '../services/search.service';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Schedule } from '../models/schedule.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  hoveredDate: NgbDate;


  fromDate: NgbDate;
  toDate: NgbDate;

  startDate: Date;
  stopDate: Date;

  dateRange = {
    startDate: this.startDate,
    stopDate: this.stopDate
  };
  availability: Array<any> = [];
  availabilityString: Array<any> = [];

  email: string;
  id: string;

  schedule: Schedule;

  startDay: number;
  startMonth: number;
  startYear: number;

  stopDay: number;
  stopMonth: number;
  stopYear: number;

  mode;

  deletedDate: Array<any> = [];
  show = true;

  duplicated: boolean;

  isLoading: boolean;

  constructor(
    calendar: NgbCalendar,
    public searchService: SearchService,
    private auth: AuthService,
    public route: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.isLoading = true;
    console.log(this.router.url);
    this.startDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    this.stopDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);

    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has("email")) {
    //   }
    //   this.isLoading = false;
    // });

    this.email = this.auth.getUserId();
    this.searchService.getSchedule(this.email).subscribe((data) => {
      if (data === null) {
        this.mode = 'add';
        console.log(this.mode);
      } else {
        this.mode = 'update';
        console.log(this.mode);
        this.schedule = {
          _id: data._id,
          caregiverEmail: data.caregiverEmail,
          availability: data.availability
        };
        this.id = this.schedule._id;
        this.email = this.schedule.caregiverEmail;
        this.availability = data.availability;
        console.log('data before push');
        console.log(this.availability);
        this.availability.forEach(element => {
          const startDate = new Date(element.startDate);
          const stopDate = new Date(element.stopDate);
          const newElement = {
            startDate: `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`,
            stopDate: `${stopDate.getDate()}/${stopDate.getMonth() + 1}/${stopDate.getFullYear()}`
          };
          this.availabilityString.push(newElement);
        });
        console.log(this.availability);
        console.log(this.availabilityString);
      }
    });
    this.isLoading = false;
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

  save() {
    this.duplicated = false;
    this.startDay = this.fromDate.day;
    this.startMonth = this.fromDate.month;
    this.startYear = this.fromDate.year;

    this.stopDay = this.toDate.day;
    this.stopMonth = this.toDate.month;
    this.stopYear = this.toDate.year;

    this.startDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    this.stopDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
    console.log(this.fromDate.day);
    console.log(this.toDate.day);

    console.log(this.availability);

    this.availability.forEach(element => {
      const startDate = new Date(element.startDate);
      const stopDate = new Date(element.stopDate);
      if (startDate.getTime() === this.startDate.getTime() && stopDate.getTime() === this.stopDate.getTime()) {
        console.log(element);
        // this.open('content');
        this.duplicated = true;
        return;
      }
    });
    // console.log(duplicated);
    if (this.duplicated === false ) {
      this.availability.unshift(this.dateRange = {
        startDate: this.startDate,
        stopDate: this.stopDate
      });
      const newElement = {
        startDate: `${this.startDate.getDate()}/${this.startDate.getMonth() + 1}/${this.startDate.getFullYear()}`,
        stopDate: `${this.stopDate.getDate()}/${this.stopDate.getMonth() + 1}/${this.stopDate.getFullYear()}`,
        removed: false
      };
      this.availabilityString.unshift(newElement);
      console.log('data after pushed');
      console.log(this.availability);
      if (this.mode === 'add') {
        this.searchService.addSchedule(this.email, this.availability);
        this.mode = 'update';
      } else if (this.mode === 'update') {
        this.searchService.updateSchedule(this.id, this.email, this.availability);
      }
      console.log("update for user " + this.email);
    }
  }

  open(content) {
    if (this.duplicated === true) {
      this.modalService.open(content, {centered: true});
    } else {
      return;
    }
  }

  remove(i: any) {
    // this.startDay = null;
    // this.startMonth = null;
    // this.startYear = null;

    // this.stopDay = null;
    // this.stopMonth = null;
    // this.stopYear = null;
    // console.log('deleting ' + this.availabilityString[i]);
    // console.log('deleting ' + this.availability[i]);
    // delete this.availabilityString[i];
    // delete this.availability[i];

    const date = {
      i,
      availability: this.availability[i],
      availabilityString: this.availabilityString[i]
    };

    this.deletedDate.push(date);
    console.log(this.deletedDate);

    this.availabilityString[i] = null;
    console.log(this.availability);
    this.availability.splice(i, 1);
    console.log(this.availability);
    this.searchService.updateSchedule(this.id, this.email, this.availability);
    // location.reload();

  }

  undo(i: any) {
    console.log(this.availability);
    this.deletedDate.forEach(element => {
      if (element.i === i) {
        console.log(element);
        this.availability.splice(i, 0, element.availability);
        this.availabilityString.splice(i, 1, element.availabilityString);
      }
    });
    this.searchService.updateSchedule(this.id, this.email, this.availability);
    console.log(this.availability);
  }
}
