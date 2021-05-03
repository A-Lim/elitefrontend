import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { UserGroupService } from 'app/modules/usergroups/usergroups.service';
import { PermissionModule } from 'app/modules/usergroups/models/permissionmodule.model';
import { UserGroupVm } from 'app/modules/usergroups/models/usergroup.model.vm';
import { CheckBox, CheckBoxGroup } from 'app/shared/models/checkbox.model';

@Component({
  selector: 'usergroups-create',
  templateUrl: './usergroups-create.component.html',
  styleUrls: ['./usergroups-create.component.css']
})
export class UserGroupsCreateComponent extends Base implements OnInit, OnDestroy {
  @ViewChild('form')
  form: NgForm;

  userGroupVm: UserGroupVm;
  checkBoxGroups: CheckBoxGroup[];

  constructor(private userGroupSvc: UserGroupService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.userGroupVm = new UserGroupVm();
    this.setTitle('Create UserGroup');

    this.userGroupSvc.getPermissions()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => this.mapPermissionToCheckBoxes(response.data));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit() {
    this.submitted = true;
    let userGroup = null;
    
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;
    this.userGroupSvc.createUserGroup(this.userGroupVm)
      .pipe(
        tap(response => userGroup = response.data),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      )
      .subscribe(_ => { 
        this.isLoading = false;
        this.router.navigate(['admin/usergroups', userGroup.id]);
      }, errorResponse => {
        this.swalAlert('Error', errorResponse.error.message, 'error');
        this.isLoading = false;
      });
  }

  mapPermissionToCheckBoxes(permissionModules: PermissionModule[]) {
    this.checkBoxGroups = permissionModules.map(function (module) {
      return <CheckBoxGroup> {
        name: module.name,
        value: module.code,
        checkboxes: module.permissions.map(function (permission) {
          return <CheckBox> {
            name: permission.name,
            value: permission.id,
            isChecked: false
          };
        })
      };
    });
  }

  onPermissionChecked() {
    this.checkBoxGroups.map(function (group) {
      const isCheckCount = group.checkboxes.filter(x => x.isChecked).length;
      group.isChecked = isCheckCount === group.checkboxes.length;
      return group;
    });

    this.userGroupVm.permissions = this.getCheckedPermissions();
  }

  onPermissionModuleChecked(module: string) {
    for (let i = 0; i < this.checkBoxGroups.length; i++) {
      if (this.checkBoxGroups[i].value === module) {
        if (this.checkBoxGroups[i].isChecked)
          this.checkBoxGroups[i].checkboxes.forEach(cb => cb.isChecked = true);
        else 
          this.checkBoxGroups[i].checkboxes.forEach(cb => cb.isChecked = false);
        break;
      }
    }
    
    this.userGroupVm.permissions = this.getCheckedPermissions();
  }

  getCheckedPermissions() {
    let permissionCodes = [];
    for (let i = 0; i < this.checkBoxGroups.length; i++) {
      for (let j = 0; j < this.checkBoxGroups[i].checkboxes.length; j++) {
        if (this.checkBoxGroups[i].checkboxes[j].isChecked)
          permissionCodes.push(this.checkBoxGroups[i].checkboxes[j].value);
      }
    }
    return permissionCodes;
  }
}