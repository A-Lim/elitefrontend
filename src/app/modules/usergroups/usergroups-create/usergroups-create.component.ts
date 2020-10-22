import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { UserGroupService } from 'app/modules/usergroups/usergroups.service';
import { PermissionModule } from 'app/modules/usergroups/models/permissionmodule.model';
import { UserGroupVm } from 'app/modules/usergroups/models/usergroup.model.vm';

@Component({
  selector: 'usergroups-create',
  templateUrl: './usergroups-create.component.html',
  styleUrls: ['./usergroups-create.component.css']
})
export class UserGroupsCreateComponent extends Base implements OnInit, OnDestroy {
  @ViewChild('form')
  form: NgForm;

  userGroupVm: UserGroupVm;
  permissionModules$: Observable<PermissionModule[]>;

  activeTab: UserGroupTab;

  // track tab status
  generalTabValid: boolean;
  usersTabValid: boolean;
  
  allTabsValid: boolean;

  constructor(private userGroupSvc: UserGroupService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Create User Group');
    this.setup();

    this.permissionModules$ = this.userGroupSvc.getPermissions()
      .pipe(map(result => result.data));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  setup() {
    this.generalTabValid = true;
    this.usersTabValid = true;
    this.allTabsValid = false;
    this.activeTab = UserGroupTab.General;
    this.userGroupVm = new UserGroupVm();
  }

  onFormStatusChange(tab: UserGroupTab, isValid: boolean) {
    switch (tab) {
      case UserGroupTab.General:
        this.generalTabValid = isValid;
        break;
      
      case UserGroupTab.Users:
        this.usersTabValid = isValid;
        break;
    }
  }

  onTabChange(tab: UserGroupTab) {
    this.activeTab = tab;
  }

  onSubmit() {
    this.submitted = true;
  
    // validate form
    if (!this.allTabsValid)
      return;

    this.isLoading = true;
    this.userGroupSvc.createUserGroup(this.userGroupVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => { 
        this.isLoading = false;
        this.router.navigate(['admin/usergroups']);
      }, _ => this.isLoading = false);
  }

  get UserGroupTab() {
    return UserGroupTab;
  }
}

enum UserGroupTab {
  General,
  Users
}