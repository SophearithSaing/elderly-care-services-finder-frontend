import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  isLoading = false;
  validUser = false;

  showErrorMessage: boolean;

  constructor(public authService: AuthService, private router: Router) { }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
    setTimeout(() => {
      this.validUser = this.authService.getIsAuth();
      console.log('valid user value is ' + this.validUser);
      if (this.validUser === true) {
        this.router.navigate(['/admin-home']);
      } else {
        this.isLoading = false;
        this.showErrorMessage = true;
      }
    }, 2000);
  }

  hideErrorMessage() {
    // this.showErrorMessage = false;
  }
}
