import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  elderId: string;
  title = 'first-app';

  constructor(private authService: AuthService) {}

  // ngOnInit() {
  //   this.elderId = this.authService.getUserId();
  // }
  ngOnInit() {
    this.authService.autoAuthUser();
  }

  onLogout() {
    this.authService.logout();
  }
}
