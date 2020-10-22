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
  selector: 'usergroups-create-general-tab',
  templateUrl: './usergroups-create-general-tab.component.html',
  styleUrls: ['./usergroups-create-general-tab.component.css']
})
export class UserGroupsCreateGeneralTabComponent extends Base implements OnInit, OnDestroy, AfterViewInit {
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
