import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-elder-login',
  templateUrl: './elder-login.component.html',
  styleUrls: ['./elder-login.component.css']
})
export class ElderLoginComponent {

  isLoading = false;
  validUser = false;

  showErrorMessage: boolean;

  constructor(public authService: AuthService, private router: Router) { }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    // this.authService.login(form.value.email, form.value.password);
    setTimeout(() => {
      this.validUser = this.authService.getIsAuth();
      console.log('valid user value is ' + this.validUser);
      if (this.validUser === true) {
        this.router.navigate(['/elder-home']);
      } else {
        this.showErrorMessage = true;
      }
    }, 2000);
  }

  hideErrorMessage() {
    this.showErrorMessage = false;
  }

}
