import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { UserGroupVm } from 'app/modules/usergroups/models/usergroup.model.vm';
import { CheckBoxGroup, CheckBox } from 'app/shared/models/checkbox.model';
import { PermissionModule } from 'app/modules/usergroups/models/permissionmodule.model';
import { FORMSTATUS } from 'app/shared/constants/formstatus.constants';

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
  permissionModules$: Observable<PermissionModule[]>;

  @Input()
  submitted: boolean;

  @Input()
  isLoading: boolean;

  @Output()
  formValid = new EventEmitter<boolean>();

  checkBoxGroups: CheckBoxGroup[];

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.permissionModules$
      .pipe(takeUntil(this.destroy$))
      .subscribe(permissionModules => this.mapPermissionToCheckBoxes(permissionModules));
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

  mapPermissionToCheckBoxes(permissionModules: PermissionModule[]) {
    this.checkBoxGroups = permissionModules.map(function (module) {
      const checkboxes = module.permissions.map(function (permission) {
        // if is_admin all permissions checked
        let isChecked = this.userGroupVm.is_admin ? true :
          this.userGroupVm.permissions.includes(permission.code);

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
