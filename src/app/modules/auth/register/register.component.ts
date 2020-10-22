import { Component, OnInit, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'app/core/services/auth.service';
import { SystemSettingService } from 'app/modules/systemsettings/systemsettings.service';
import { Base } from 'app/shared/components/base.component';
import { RegisterVm } from 'app/modules/auth/models/register.model.vm';


@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends Base implements OnInit, OnDestroy {

  @ViewChild('form')
  form: NgForm;

  registerVm: RegisterVm;
  allowPublicRegistration: boolean = true;

  constructor(public authSvc: AuthService, private systemSettingSvc: SystemSettingService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Register');

    this.systemSettingSvc.allowPublicRegistration()
      .subscribe(response => this.allowPublicRegistration = response.data);

    this.registerVm = new RegisterVm();
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

    this.authSvc.register(this.registerVm)
      .subscribe(response => {
        if (response.message)
          this.alertSvc.success(response.message);
        
        this.submitted = false;
        this.isLoading = false;
      }, _ => {
        this.isLoading = false;
      });
  }
}
