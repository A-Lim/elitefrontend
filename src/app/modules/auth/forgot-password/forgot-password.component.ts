import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'app/core/services/auth.service';
import { Base } from 'app/shared/components/base.component';
import { ForgotPasswordVm } from '../models/forgotpassword.model.vm';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent extends Base implements OnInit, OnDestroy {

  @ViewChild('form')
  form: NgForm;

  forgotPasswordVm: ForgotPasswordVm;

  constructor(private authSvc: AuthService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Forgot Password');
    this.forgotPasswordVm = new ForgotPasswordVm();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit() {
    this.submitted = true;
    // validate form
    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;
    this.authSvc.forgotPassword(this.forgotPasswordVm)
      .subscribe(response => {
        this.alertSvc.success(response.message);
        this.isLoading = false;
      }, _ => {
        this.isLoading = false;
      });
  }
}
