import { Component, OnInit, OnDestroy } from '@angular/core';
import { Base } from 'app/shared/components/base.component';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PageNotFoundComponent extends Base implements OnInit, OnDestroy {

  isAuthenticated: boolean;

  constructor(private authSvc: AuthService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Page Not Found');
    this.isAuthenticated = this.authSvc.isAuthenticated();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
