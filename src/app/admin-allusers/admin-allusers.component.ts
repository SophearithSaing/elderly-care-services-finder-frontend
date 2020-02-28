import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-admin-allusers',
  templateUrl: './admin-allusers.component.html',
  styleUrls: ['./admin-allusers.component.css']
})
export class AdminAllusersComponent implements OnInit {

  caregivers;
  elders;

  constructor(private admin: AdminService, private search: SearchService) { }

  ngOnInit() {
    this.search.getCaregivers().subscribe(data => {
      this.caregivers = data.users;
    });
    this.search.getElders().subscribe(data => {
      this.elders = data.users;
    })
  }

}
