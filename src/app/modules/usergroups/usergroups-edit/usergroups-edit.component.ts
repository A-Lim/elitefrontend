import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { UserGroupService } from 'app/modules/usergroups/usergroups.service';
import { PermissionModule } from 'app/modules/usergroups/models/permissionmodule.model';
import { UserGroupVm } from 'app/modules/usergroups/models/usergroup.model.vm';

@Component({
  selector: 'usergroups-edit',
  templateUrl: './usergroups-edit.component.html',
  styleUrls: ['./usergroups-edit.component.css']
})
export class UserGroupsEditComponent extends Base implements OnInit, OnDestroy {
  @ViewChild('form')
  form: NgForm;

  id: number;
  userGroupVm: UserGroupVm;
  permissionModules$: Observable<PermissionModule[]>;

  // track tab status
  generalTabValid: boolean;
  usersTabValid: boolean;
  
  allTabsValid: boolean;

  constructor(private route: ActivatedRoute, private userGroupSvc: UserGroupService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Create User Group');

    this.generalTabValid = true;
    this.usersTabValid = true;
    this.allTabsValid = true;
    this.loadUserGroup();

    this.permissionModules$ = this.userGroupSvc.getPermissions()
      .pipe(map(result => result.data));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadUserGroup() {
    this.isLoading = true;
    this.id = +this.route.snapshot.paramMap.get('id');

    this.userGroupSvc.getUserGroup(this.id)
      .subscribe(response => {
        this.userGroupVm = <UserGroupVm> {
          name: response.data.name,
          code: response.data.code,
          is_admin: response.data.is_admin,
          status: response.data.status,
          userIds: response.data.users.map(x => x.id),
          permissions: response.data.permissions.map(x => x.id),
        }
        this.isLoading = false;
      }, _ => { this.isLoading = false; });
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

    this.allTabsValid = this.generalTabValid &&
                        this.usersTabValid;
  }

  onSubmit() {
    this.submitted = true;
  
    // validate form
    if (!this.allTabsValid)
      return;

    this.isLoading = true;
    this.userGroupSvc.updateUserGroup(this.id, this.userGroupVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.router.navigate(['admin/usergroups']);
      }, _ => { this.isLoading = false; });
  }

  get UserGroupTab() {
    return UserGroupTab;
  }
}

enum UserGroupTab {
  General,
  Users
}