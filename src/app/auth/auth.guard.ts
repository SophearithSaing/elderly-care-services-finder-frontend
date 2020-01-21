import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  isAuth;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    setTimeout(() => {
      this.isAuth = this.authService.getIsAuth();
      console.log(this.isAuth);
      if (!this.isAuth) {
        this.router.navigate(['/home']);
      }
    }, 5000);

    this.isAuth = this.authService.getIsAuth();
    console.log(this.isAuth);
    if (!this.isAuth) {
      this.router.navigate(['/home']);
    }

    return this.isAuth;
  }
}
