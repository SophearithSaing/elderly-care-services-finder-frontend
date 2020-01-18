import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { SearchService } from "../services/search.service";
import { User } from '../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // enteredName = '';
  // enteredEmail = '';
  // enteredPassword = '';
  user: User;
  private userId: string;
  private mode = "create";

  constructor(public searchService: SearchService, public route: ActivatedRoute) { }

  // ngOnInit() {
  //   this.route.paramMap.subscribe((paramMap: ParamMap) => {
  //     if (paramMap.has("postId")) {
  //       this.mode = "edit";
  //       this.postId = paramMap.get("postId");
  //       this.isLoading = true;
  //       this.postsService.getPost(this.postId).subscribe(postData => {
  //         this.isLoading = false;
  //         this.post = {id: postData._id, title: postData.title, content: postData.content};
  //       });
  //     } else {
  //       this.mode = "create";
  //       this.postId = null;
  //     }
  //   });
  // }

    ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("userId")) {
        this.mode = "edit";
        this.userId = paramMap.get("userId");
        // this.user =  this.searchService.getUser(this.userId);
        // this.isLoading = true;
        this.searchService.getUser(this.userId).subscribe(Data => {
          // this.isLoading = false;
          this.user = {_id: Data._id, name: Data.name, email: Data.email, password: Data.password};
        });
      } else {
        this.mode = "create";
        this.userId = null;
      }
    });
  }



  // onSaveUser(form: NgForm) {
  //   if (form.invalid) {
  //     return;
  //   }
  //   this.searchService
  //   .addUser(form.value.name, form.value.email, form.value.password);
  //   form.resetForm();
  // }
  onSaveUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.isLoading = true;
    if (this.mode === "create") {
      this.searchService.addUser(form.value.name, form.value.email, form.value.password);
    } else {
      this.searchService.updateUser(
        this.userId,
        form.value.name,
        form.value.password,
        form.value.email
      );
    }
    form.resetForm();
  }
}
