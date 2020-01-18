import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-caregiver-login',
  templateUrl: './caregiver-login.component.html',
  styleUrls: ['./caregiver-login.component.css']
})
export class CaregiverLoginComponent {

  isLoading = false;

  constructor(public authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
    setTimeout(() => {
      this.router.navigate(['/caregiver-home']);
    }, 2000);
  }

}
