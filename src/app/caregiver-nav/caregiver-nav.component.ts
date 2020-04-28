import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caregiver-nav',
  templateUrl: './caregiver-nav.component.html',
  styleUrls: ['./caregiver-nav.component.css']
})
export class CaregiverNavComponent implements OnInit {

  email: string;
  name: string;
  // image = 'http://localhost:3000/images/excited-elder-man-cheering-up.jpg-1582173897314.jpg';
  image: string;
  role: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private searchService: SearchService,
    private router: Router) {

  }

  ngOnInit() {
    this.email = this.authService.getUserId();
    this.searchService.getCaregiver(this.email).subscribe(res => {
      this.name = res.name;
      this.image = res.imagePath;
      this.role = 'Caregiver';

      if (this.role !== 'Caregiver') {
        this.router.navigate(['/home']);
      }
    });
  }

  getImage() {
    return `url('${this.image}')`;
  }

  logout() {
    this.authService.logout();
  }

}
