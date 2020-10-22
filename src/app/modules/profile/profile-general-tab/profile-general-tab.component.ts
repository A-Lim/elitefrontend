import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { BaseFormComponent } from 'app/shared/components/baseform.component';
import { AlertService } from 'app/shared/services/alert.service';
import { User } from 'app/modules/users/models/user.model';
import ValidationUtil from 'app/shared/helpers/validation.util';
import { AuthService } from 'app/core/services/auth.service';
import { Base } from 'app/shared/components/base.component';
import { ProfileVm } from '../models/profile.model.vm';

@Component({
  selector: 'profile-general-tab',
  templateUrl: './profile-general-tab.component.html',
  styleUrls: ['./profile-general-tab.component.css']
})
export class ProfileGeneralTabComponent extends Base implements OnInit, OnDestroy, AfterViewInit {
  
  user: User;
  profileVm: ProfileVm;

  @ViewChild('form')
  form: NgForm;

  constructor(public authService: AuthService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadProfile();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  ngAfterViewInit() {

  }

  loadProfile() {
    this.isLoading = true;
    this.authService.getProfile()
      .subscribe(response => {
        this.user = response.data;
        this.profileVm = <ProfileVm> { name: response.data.name };
        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }

  onSubmit() {
    this.submitted = true;

    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;

    this.authService.updateProfile(this.profileVm)
      .subscribe(response => {
        this.swalAlert('Success', response.message, 'success');
        this.user = response.data;

        this.profileVm.oldPassword = null;
        this.profileVm.newPassword = null;
        this.profileVm.newPassword_confirmation = null;
        
        this.submitted = false;
        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }
}
