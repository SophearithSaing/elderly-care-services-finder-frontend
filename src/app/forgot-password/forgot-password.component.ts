import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../services/search.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  allUsers: any;
  userExist: boolean;
  isLoading = false;
  sent = false;

  constructor(private search: SearchService, private http: HttpClient, private auth: AuthService) { }

  ngOnInit() {
    this.userExist = null;
    this.getAllUsers();
    console.log(this.allUsers);
  }

  getAllUsers() {
    this.search.getAllUsers().subscribe(data => {
      this.allUsers = data.users;
      console.log(this.allUsers);
    });
  }

  sendEmail() {
    // check if user exists
    this.allUsers.forEach(element => {
      if (element.email === this.email) {
        this.userExist = true;

        this.auth.forgotPassword(this.email);
        console.log(this.email);
      }
    });
    this.sent = true;

  }


}
