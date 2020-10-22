import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject, concat, of } from 'rxjs';
import { distinctUntilChanged, tap, switchMap, catchError, map, debounceTime } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { User } from 'app/modules/users/models/user.model';
import { UserVm } from 'app/modules/users/models/user.model.vm';
import { UserGroup } from 'app/modules/usergroups/models/usergroup.model';
import { UserService } from 'app/modules/users/users.service';
import { UserGroupService } from 'app/modules/usergroups/usergroups.service';
import { Ability } from '@casl/ability';

@Component({
  selector: 'users-edit-general-tab',
  templateUrl: './users-edit-general-tab.component.html',
  styleUrls: ['./users-edit-general-tab.component.css']
})
export class UsersEditGeneralTabComponent extends Base implements OnInit {
  @Input()
  user: User;

  @Input()
  userVm: UserVm;
  
  userGroupInput$ = new Subject<string>();
  userGroups$: Observable<UserGroup[]>;
  userGroupsReqLoading: boolean;

  @ViewChild('form')
  form: NgForm;

  constructor(public userService: UserService, private userGroupSvc: UserGroupService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadUserGroup();
  }

  loadUserGroup() {
    this.userGroupsReqLoading = false;

    this.userGroups$ = concat(
      this.getUserGroupsFn$(null, this.userVm.usergroups), // default items
      this.userGroupInput$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(_ => this.userGroupsReqLoading = true),
        switchMap(searchStr => this.getUserGroupsFn$(searchStr))
      )
    );
  }

  trackByFn(userGroup: UserGroup) {
    return userGroup.id;
  }

  onSubmit() {
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;
    this.userService.updateUser(this.user.id, this.userVm)
      .subscribe(response => {
        this.user = response.data;
        this.isLoading = false;
        this.swalAlert('Success', response.message, 'success')
          .subscribe(_ => this.router.navigate(['admin/users']));
      }, _ => { this.isLoading = false; });
  }

  private getUserGroupsFn$(searchStr?: string ,ids?: number[]) {
    let params: any = { limit: 10, page: 1, type: 'formcontrol' };

    if (searchStr != null && searchStr != '')
     params.name = `contains:${searchStr}`;

    if (ids && ids.length > 0) {
      ids.forEach(function (id, index) {
        params['id[' + index + ']'] = id;
      });
      // if ids count > 10, override limit 
      params.limit = ids.length > 10 ? ids.length : 10;
    }

    return this.userGroupSvc.getUserGroups(params).pipe(
      tap(_ => this.userGroupsReqLoading = false),
      map(response => response.data.data),
      catchError(() => of([])), // empty list on error
    )
  }
}
