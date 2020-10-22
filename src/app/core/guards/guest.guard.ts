import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from 'app/core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router, private location: Location) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean | Observable<boolean> | Promise <boolean> {
    const isAuthenticated = this.authSvc.isAuthenticated();
    if (isAuthenticated) {
      this.location.back();
      // this.router.navigate(['admin/dashboard']);
    }
    return !isAuthenticated;
  }
}