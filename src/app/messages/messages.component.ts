import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../services/search.service';
import { AuthService } from '../auth/auth.service';

import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  text: string;
  email: string;

  user: string;

  messages = [];
  sender: string;

  caregiver;
  elder;

  data;



  subscription: Subscription;

  constructor(private search: SearchService, private auth: AuthService) { }

  ngOnInit() {
    // this.search.createChat('sophearithsaing123@hotmail.com', 'sophearithsaing123@gmail.com');
    this.email = this.auth.getUserId();

    if (this.email === 'sophearithsaing123@hotmail.com') {
      this.user = 'elder';
    } else {
      this.user = 'caregiver';
    }

    if (this.user === 'elder') {
      this.search.getElder(this.email).subscribe(data => {
        this.sender = data.name;
      });
    } else if (this.user === 'caregiver') {
      this.search.getCaregiver(this.email).subscribe(data => {
        this.sender = data.name;
      });
    }
    this.get();


    //emit value in sequence every 10 second
    const source = interval(1000);
    // const text = 'Your Text Here';
    this.subscription = source.subscribe(val => this.get());
    console.log('ran here')
  }

  get() {
    this.search.getMessages('sophearithsaing123@hotmail.com', 'sophearithsaing123@gmail.com').subscribe(data => {
      this.data = data;
      console.log(data.messages);
      console.log(this.data[0].messages);
      this.messages = this.data[0].messages;
    });
  }


  send() {
    const data = {
      sender: this.sender,
      time: 'now',
      text: this.text
    };
    if (this.messages === null || this.messages === undefined) {
      this.messages = [];
    }
    this.messages.push(data);

    const message = {
      elder: 'sophearithsaing123@hotmail.com',
      caregiver: 'sophearithsaing123@gmail.com',
      messages: this.messages
    };
    this.text = '';
    console.log(message);
    console.log(this.messages);
    this.search.sendMessage(message);


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
