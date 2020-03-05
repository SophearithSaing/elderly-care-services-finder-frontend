import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  elderId: string;
  currentRoute: string;


  constructor(private authService: AuthService, private router: Router) {}

  // ngOnInit() {
  //   this.elderId = this.authService.getUserId();
  // }
  ngOnInit() {
    this.authService.autoAuthUser();
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
  }

  onLogout() {
    this.authService.logout();
  }
}
