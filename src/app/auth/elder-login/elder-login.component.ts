import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms';

import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-elder-login',
  templateUrl: './elder-login.component.html',
  styleUrls: ['./elder-login.component.css']
})
export class ElderLoginComponent {

  isLoading = false;
  validUser = null;

  constructor(public authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.validUser = this.authService.login(form.value.email, form.value.password);
    console.log('valid user value is ' + this.validUser);
    setTimeout(() => {
      this.router.navigate(['/elder-home']);
    }, 2000);

  }

}
