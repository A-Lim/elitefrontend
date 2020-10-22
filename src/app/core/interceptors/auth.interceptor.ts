  
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from 'app/core/services/auth.service';
import { AlertService } from 'app/shared/services/alert.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private excludedUrl = [
    '/login',
    '/register',
    '/verify-email',
    '/forgot-password',
    '/reset-password',
  ];

  constructor(private router: Router, 
    private authSvc: AuthService, 
    private alertSvc: AlertService) { 
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.authSvc.accessToken;
    const authRequest = this.addToken(req, accessToken);

    if (req.headers.has('X-Skip-Interceptor')) {
      const headers = req.headers.delete('X-Skip-Interceptor');
      return next.handle(req.clone({ headers }));
    }
    
    return next.handle(authRequest).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.authSvc.reset();
          this.alertSvc.error('Session expired.', true, true);
          this.router.navigate(['login']);
        }

        // if (error.status === 401 && error.error.message === 'Unauthenticated.') {
        //   this.isRefreshing = true;
        //   this.refreshTokenSubject.next(null);

        //   return this.refreshToken(req, next);
        // }
        return throwError(error);
      })
    );
  }
  
  // private refreshToken(req: HttpRequest<any>, next: HttpHandler) {
  //   return this.authSvc.refreshAuthToken().pipe(
  //     switchMap(response => {
  //       const refreshResponse = response.data;

  //       this.isRefreshing = false;
  //       this.refreshTokenSubject.next(refreshResponse.refreshToken);
  //       return next.handle(this.addToken(req, refreshResponse.accessToken));
  //     }),
  //     // error during refresh token
  //     // clear authdata and redirect to login page
  //     catchError(error => {
  //       this.authSvc.reset();
  //       this.alertSvc.error('Session expired.', false, true);
  //       this.router.navigate(['login']);
  //       return throwError(error);
  //     })
  //   );
  // }

  private addToken(req: HttpRequest<any>, accessToken: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });
  }
}