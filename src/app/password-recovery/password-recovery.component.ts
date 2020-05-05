import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../services/search.service';
import { AuthService } from '../auth/auth.service';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  isLoading = false;
  firstPassword: string;
  secondPassword: string;
  confirmPassword: boolean;
  shortPassword: boolean;
  showHelp = false;
  token: string;
  userExist = false;

  constructor(private search: SearchService, private http: HttpClient, private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('token')) {
        this.token =  paramMap.get('token');
        console.log(this.token);
        this.search.verifyToken(this.token).subscribe(data => {
          if (data !== null) {
            this.userExist = true;
          } else {
            this.userExist = false;
          }
        });
      }
      this.isLoading = false;
    });
  }

  resetPassword() {
    console.log(this.token, this.secondPassword);
    this.auth.resetPassword(this.token, this.secondPassword);
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

}
