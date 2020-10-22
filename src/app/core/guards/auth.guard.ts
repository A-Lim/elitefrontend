import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'app/core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise <boolean> {
    const isAuthenticated = this.authSvc.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    }
    return isAuthenticated;
  }
}