import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { User } from 'app/modules/users/models/user.model';
import { AuthService } from 'app/core/services/auth.service';
import { AlertService } from 'app/shared/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public isAuthenticated$: Observable<boolean>;
  public user$: Observable<User>;

  constructor(private authSvc: AuthService, private alertSvc: AlertService, private router: Router) { }

  ngOnInit() {
    this.isAuthenticated$ = this.authSvc.isAuthenticated$;
    this.user$ = this.authSvc.user$;
    // authListenerSubscriber block might not be initialize first cause synchronous code
    // call checkIsAuthenticated first in case subscriber is not called
    // this.isAuthenticated = this.authService.isAuthenticated();
    // this.user = this.authService.getUser();
    // this.authListenerSubscriber = this.authService
    //   .getAuthStatusListener()
    //   .subscribe(data => {
    //     this.isAuthenticated = data.isAuthenticated;
    //     this.user = data.user;
    //   });
  }
  
  onLogout() {
    this.authSvc.logout()
      .subscribe(response => {
        this.alertSvc.success(response.message, true, true);
        this.router.navigate(['login']);
      }, error => {
        this.alertSvc.error(error);
      });
  }

  ngOnDestroy() {
    // this.authListenerSubscriber.unsubscribe();
  }
}
