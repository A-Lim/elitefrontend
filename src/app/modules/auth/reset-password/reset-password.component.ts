import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators, NgForm } from '@angular/forms';

import { App } from 'app/configs/app.config';
import { AuthService } from 'app/core/services/auth.service';
import { AlertService } from 'app/shared/services/alert.service';
import ValidationUtil from 'app/shared/helpers/validation.util';
import { Base } from 'app/shared/components/base.component';
import { ResetPasswordVm } from '../models/resetpassword.model.vm';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends Base implements OnInit, OnDestroy {

  @ViewChild('form')
  form: NgForm;

  email: string;
  token: string;
  disabled: boolean;

  resetPasswordVm: ResetPasswordVm;

  constructor(private route: ActivatedRoute, public authService: AuthService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Reset Password');
    this.resetPasswordVm = new ResetPasswordVm();
    this.disabled = false;

    this.token = this.route.snapshot.queryParamMap.get('token');
    this.email = this.route.snapshot.queryParamMap.get('email');
    
    if (this.token === null || this.token === "" ||
        this.email === null || this.email === "") {
      this.disabled = true;
      this.alertSvc.error("Invalid link", false);
    }
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
    this.authService.resetPassword(this.resetPasswordVm)
      .subscribe(response => {
        if (response.message)
          this.alertSvc.success(response.message);
        
        this.isLoading = false;
      }, _ => {
        this.isLoading = false;
      });
  }
}
