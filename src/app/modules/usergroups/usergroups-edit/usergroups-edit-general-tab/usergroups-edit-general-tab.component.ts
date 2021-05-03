import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { takeUntil, debounceTime, switchMap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { UserGroupVm } from 'app/modules/usergroups/models/usergroup.model.vm';
import { CheckBoxGroup, CheckBox } from 'app/shared/models/checkbox.model';
import { PermissionModule } from 'app/modules/usergroups/models/permissionmodule.model';
import { FORMSTATUS } from 'app/shared/constants/formstatus.constants';
import { UserGroupService } from '../../usergroups.service';

@Component({
  selector: 'usergroups-edit-general-tab',
  templateUrl: './usergroups-edit-general-tab.component.html',
  styleUrls: ['./usergroups-edit-general-tab.component.css']
})
export class UserGroupsEditGeneralTabComponent extends Base implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('form')
  form: NgForm;
  
  @Input()
  userGroupVm: UserGroupVm;

  @Input()
  submitted: boolean;

  @Input()
  isLoading: boolean;

  @Output()
  formValid = new EventEmitter<boolean>();

  checkBoxGroups: CheckBoxGroup[];

  constructor(private userGroupSvc: UserGroupService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.userGroupSvc.getPermissions()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => this.mapPermissionToCheckBoxes(response.data));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  ngAfterViewInit() {
    this.form.statusChanges.pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    ).subscribe(status => this.formValid.emit(status !== FORMSTATUS.INVALID));
  }

  onSubmit() {
    this.submitted = true;
  
    // validate form
    if (!this.form)
      return;

    this.isLoading = true;
    this.userGroupSvc.updateUserGroup(this.userGroupVm.id, this.userGroupVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.router.navigate(['admin/usergroups']);
      }, _ => { this.isLoading = false; });
  }

  mapPermissionToCheckBoxes(permissionModules: PermissionModule[]) {
    this.checkBoxGroups = permissionModules.map(function (module) {
      const checkboxes = module.permissions.map(function (permission) {
        // if is_admin all permissions checked
        let isChecked = this.userGroupVm.is_admin ? true :
          this.userGroupVm.permissions.includes(permission.id);

        return <CheckBox> {
          name: permission.name,
          value: permission.id,
          isChecked: isChecked
        };
      }, this);

      const checkedCount = checkboxes.filter(x => x.isChecked).length;
      
      return <CheckBoxGroup> {
        name: module.name,
        value: module.code,
        isChecked: checkedCount === module.permissions.length,
        checkboxes: checkboxes
      };
    }, this);
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
