import { Component, OnInit } from '@angular/core';
import { Caregiver } from '../models/caregiver.model';
import { AuthService } from '../auth/auth.service';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caregiver-home',
  templateUrl: './caregiver-home.component.html',
  styleUrls: ['./caregiver-home.component.css']
})
export class CaregiverHomeComponent implements OnInit {

  id: string;
  caregiver: Caregiver;

  constructor(public searchService: SearchService , public authService: AuthService, public router: Router) { }

  ngOnInit() {

  }
  editCalendar() {
    this.id = this.authService.getUserId();
    console.log('id is ' + this.id);
    this.router.navigate(['/calendar/' + this.id]);
  }
}
