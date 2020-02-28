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

  confirmPassword: boolean = null;
  userExisted = false;

  constructor(public searchService: SearchService, private router: Router, public authService: AuthService) { }


  ngOnInit() {
    this.searchService.getElders().subscribe(data => {
      this.elders = data.users;
      this.elders.forEach(element => {
        const email = element.email;
        this.elderEmails.push(email);
      });
    });
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

    if (form.value.password === form.value.passwordConfirmation) {
      console.log(form.value.password + ' === ' + form.value.passwordConfirmation);
      this.confirmPassword = true;
      console.log(this.confirmPassword);

      this.elderEmails.forEach(element => {
        if (form.value.email === element) {
          this.userExisted = true;
        }
      });

      if (this.userExisted === false) {
        // create auth user
        this.authService.createUser(form.value.email, form.value.password);
        // navigate to fill information
        this.router.navigate(
          ['/elder-register', form.value.email],
          { queryParams: { mode: 'add', name: form.value.name } }
        );
      }

    } else if (form.value.password !== form.value.passwordConfirmation) {
      console.log(form.value.password + ' !== ' + form.value.passwordConfirmation);
      this.confirmPassword = false;
      console.log(this.confirmPassword);
    }
  }

  close() {
    this.confirmPassword = null;
  }



}
