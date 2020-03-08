import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

import { SearchService } from "../services/search.service";
import { Caregiver } from '../models/caregiver.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-caregiver-register',
  templateUrl: './caregiver-register.component.html',
  styleUrls: ['./caregiver-register.component.css']
})
export class CaregiverRegisterComponent implements OnInit {
  caregiver: Caregiver;
  caregivers = [];
  cgEmails = [];
  private caregiverId: string;
  private mode = "create";

  confirmPassword: boolean = null;
  userExisted = false;

  firstPassword: string;
  secondPassword: string;
  shortPassword: boolean;
  showHelp = false;


  constructor(public searchService: SearchService, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.searchService.getCaregivers().subscribe(data => {
      this.caregivers = data.users;
      this.caregivers.forEach(element => {
        const email = element.email;
        this.cgEmails.push(email);
      });
    });
  }
  onRegisterCaregiver(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.searchService
    //   .addCaregiver(
    //     form.value.name,
    //     form.value.email,
    //     form.value.birthdate,
    //     form.value.gender,
    //     form.value.houseNumber,
    //     form.value.street,
    //     form.value.subDistrict,
    //     form.value.district,
    //     form.value.province,
    //     form.value.postalCode,
    //     form.value.phoneNumber,
    //     form.value.services,
    //     form.value.certificate,
    //     form.value.experience,
    //     form.value.dailyPrice,
    //     form.value.monthlyPrice,
    //     form.value.imagePath,
    //     form.value.schedule
    //   );

    if (form.value.password === form.value.passwordConfirmation) {
      console.log(form.value.password + ' === ' + form.value.passwordConfirmation);
      this.confirmPassword = true;
      console.log(this.confirmPassword);

      console.log(this.userExisted);
      console.log(this.cgEmails);
      this.cgEmails.forEach(element => {
        if (form.value.email === element) {
          console.log(form.value.email + ' = ' + element);
          this.userExisted = true;
        }
      });
      console.log(this.userExisted);
      if (this.userExisted === false) {
        this.authService.createUser(form.value.email, form.value.password);
        // form.resetForm();
        // this.router.navigate(['/caregiver-login']);
        this.router.navigate(
          ['/caregiver-register', form.value.email],
          { queryParams: { mode: 'add', name: form.value.name, email: form.value.email } }
        );
      }

    } else if (form.value.password !== form.value.passwordConfirmation) {
      console.log(form.value.password + ' !== ' + form.value.passwordConfirmation);
      this.confirmPassword = false;
      console.log(this.confirmPassword);
    }

  }

  editPassword() {
    this.showHelp = true;
    this.confirmPassword = null;
    this.shortPassword = false;
  }

  validatePassword() {
    this.showHelp = false;
    if (this.firstPassword.length < 8) {
      this.shortPassword = true;
    }
  }

  editSecondPassword() {
    this.confirmPassword = null;
  }

  checkPasswordMatch() {
    console.log(this.firstPassword, this.secondPassword);
    if (this.firstPassword !== this.secondPassword) {
      this.confirmPassword = false;
    }
  }

  resetValidation() {
    this.userExisted = false;
  }
}
