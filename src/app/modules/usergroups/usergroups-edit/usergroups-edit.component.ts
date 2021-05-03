import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Base } from 'app/shared/components/base.component';
import { UserGroupService } from 'app/modules/usergroups/usergroups.service';
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

  constructor(private route: ActivatedRoute, private userGroupSvc: UserGroupService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Edit User Group');
    this.loadUserGroup();
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
          id: response.data.id,
          name: response.data.name,
          code: response.data.code,
          is_admin: response.data.is_admin,
          status: response.data.status,
          permissions: response.data.permissions.map(x => x.id),
        }
        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }
}
