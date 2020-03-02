import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-admin-allactivities',
  templateUrl: './admin-allactivities.component.html',
  styleUrls: ['./admin-allactivities.component.css']
})
export class AdminAllactivitiesComponent implements OnInit {

  history: any;
  isLoading: boolean;

  constructor(private search: SearchService) { }

  ngOnInit() {
    this.isLoading = true;

    this.search.getAllHistory().subscribe(data => {
      this.history = data.history;

      this.history.forEach(element => {
        const startDate = new Date(element.startDate);
        const stopDate = new Date(element.stopDate);
        const startDateString = `${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`;
        const stopDateString = `${stopDate.getDate()}/${stopDate.getMonth()}/${stopDate.getFullYear()}`;
        element.startDate = startDateString;
        element.stopDate = stopDateString;
      });

      this.isLoading = false;
    });
  }

}
