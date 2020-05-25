import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';


import { SearchService } from "../services/search.service";
import { Elder } from '../models/elder.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-elder-register',
  templateUrl: './elder-register.component.html',
  styleUrls: ['./elder-register.component.css']
})
export class ElderRegisterComponent implements OnInit {

  elder: Elder;
  elders = [];
  elderEmails = [];
  private elderId: string;
  private mode = "create";

  showHelp = false;

  confirmPassword: boolean = null;
  userExisted = false;

  firstPassword: string;
  secondPassword: string;
  shortPassword: boolean;

  name: string;
  email: string;
  password: string;

  creating: boolean;
  loggingIn: boolean;

  constructor(public searchService: SearchService, private router: Router, public authService: AuthService) { }


  ngOnInit() {
    // this.searchService.getAllUsers().subscribe(data => {
    //   this.elders = data.users;
    //   this.elders.forEach(element => {
    //     const email = element.email;
    //     this.elderEmails.push(email);
    //   });
    // });
  }
  onRegisterElder(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.searchService
    //   .addElder(
    //     form.value.name,
    //     form.value.email,
    //     form.value.password,
    //     form.value.birthdate,
    //     form.value.gender,
    //     form.value.houseNumber,
    //     form.value.street,
    //     form.value.subDistrict,
    //     form.value.district,
    //     form.value.province,
    //     form.value.postalCode,
    //     form.value.phoneNumber,
    //     form.value.imagePath
    //   );
    // this.authService.createUser(form.value.email, form.value.password);
    // form.resetForm();
    // this.router.navigate(['/elder-login']);

    console.log(form.value.password.length);

    if (form.value.password === form.value.passwordConfirmation && form.value.password.length >= 8) {
      console.log(form.value.password + ' === ' + form.value.passwordConfirmation);
      this.confirmPassword = true;
      console.log(this.confirmPassword);

      // this.elderEmails.forEach(element => {
      //   if (form.value.email === element) {
      //     this.userExisted = true;
      //   }
      // });

      this.searchService.verifyUniqueUser(form.value.email).subscribe(res => {
        this.userExisted = res.exist;
        console.log(this.userExisted);

        if (this.userExisted === false) {
          this.email = form.value.email;
          this.name = form.value.name;
          this.password = form.value.password;
          this.creating = true;
          // create auth user
          this.authService.createUser(this.name, this.email, this.password);
          // login
          setTimeout(() => {
            this.creating = false;
            this.loggingIn = true;
            this.authService.login(this.email, this.password);
            setTimeout(() => {
              // navigate to fill information
              this.router.navigate(
                ['/elder-register', this.email],
                { queryParams: { mode: 'add', name: this.name } }
              );
            }, 2000);
          }, 2000);
        }
      });

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
