import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';

import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { User } from 'app/modules/users/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = environment.name;

  public isAuthenticated$: Observable<boolean>;
  public user$: Observable<User>;

  constructor(private authSvc: AuthService, public router: Router) {
  }

  ngOnInit() {
    this.authSvc.autoAuthUser();
    this.isAuthenticated$ = this.authSvc.isAuthenticated$;
    this.user$ = this.authSvc.user$;
  }

  ngOnDestroy() {
  }
}
