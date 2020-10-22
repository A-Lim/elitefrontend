
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, concat, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, catchError, tap, takeUntil } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { User } from 'app/modules/users/models/user.model';
import { UserService } from 'app/modules/users/users.service';
import { UserGroupVm } from 'app/modules/usergroups/models/usergroup.model.vm';
import { FORMSTATUS } from 'app/shared/constants/formstatus.constants';

@Component({
  selector: 'usergroups-create-users-tab',
  templateUrl: './usergroups-create-users-tab.component.html',
  styleUrls: ['./usergroups-create-users-tab.component.css']
})
export class UserGroupsCreateUsersTabComponent extends Base implements OnInit, OnDestroy, AfterViewInit {
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

  users$: Observable<User[]>;
  usersInput$ = new Subject<string>();
  usersReqLoading: boolean;

  constructor(private userSvc: UserService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadUser();
  }

  ngAfterViewInit() {
    this.form.statusChanges.pipe(
      debounceTime(100),
      takeUntil(this.destroy$)
    ).subscribe(status => this.formValid.emit(status !== FORMSTATUS.INVALID));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadUser() {
    this.users$ = concat(
      this.getUsersFn$(), // default items
      this.usersInput$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(_ => this.usersReqLoading = true),
        switchMap(searchStr => this.getUsersFn$(searchStr))
      )
    );
  }

  trackByFn(user: User) {
    return user.id;
  }

  private getUsersFn$(searchStr: string = '') {
    let params: any = { limit: 10, page: 1 };

    if (searchStr != '')
      params.name = `contains:${searchStr}`;

    return this.userSvc.getUsers(params).pipe(
      tap(_ => this.usersReqLoading = false),
      map(response => response.data.data),
      catchError(() => of([])), // empty list on error
    )
  }
}
