import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  constructor(private search: SearchService, private http: HttpClient) { }

  ngOnInit() {
  }

}
