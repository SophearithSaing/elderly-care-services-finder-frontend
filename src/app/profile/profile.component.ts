import { Component, OnInit } from '@angular/core';
import { Elder } from '../models/elder.model';
import { Subscription } from 'rxjs';
import { SearchService } from '../services/search.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  elder: any;
  private elderSub: Subscription;
  elderEmail: string;

  constructor(public searchService: SearchService, public authService: AuthService) { }

  ngOnInit() {

  }

}
