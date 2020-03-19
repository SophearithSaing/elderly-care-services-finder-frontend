import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-elder-nav',
  templateUrl: './elder-nav.component.html',
  styleUrls: ['./elder-nav.component.css']
})
export class ElderNavComponent implements OnInit {

  email: string;
  name: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private searchService: SearchService) {}

  ngOnInit() {
    this.email = this.authService.getUserId();
    this.searchService.getElder(this.email).subscribe(res => {
      this.name = res.name;
    });
  }

}
