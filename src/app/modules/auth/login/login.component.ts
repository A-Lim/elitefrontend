import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'app/core/services/auth.service';
import { Base } from 'app/shared/components/base.component';
import { LoginVm } from 'app/modules/auth/models/login.model.vm';


@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends Base implements OnInit, OnDestroy {
  
  @ViewChild('form')
  form: NgForm;
  
  loginVm: LoginVm;

  constructor(public authSvc: AuthService) {
    super();
  }
  
  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Login');
    this.loginVm = new LoginVm();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit() {
    this.submitted = true;
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;
    this.authSvc.login(this.loginVm)
      .subscribe(_ => {
        this.isLoading = false;
        this.router.navigate(['admin/dashboard']);
      }, _ => {
        this.isLoading = false;
      });
  }
}
