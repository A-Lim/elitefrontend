import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, concat, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, catchError, tap } from 'rxjs/operators';

import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { User } from 'app/modules/users/models/user.model';
import { UserGroupService } from 'app/modules/usergroups/usergroups.service';
import { UserGroupVm } from 'app/modules/usergroups/models/usergroup.model.vm';

@Component({
  selector: 'usergroups-edit-users-tab',
  templateUrl: './usergroups-edit-users-tab.component.html',
  styleUrls: ['./usergroups-edit-users-tab.component.css']
})
export class UserGroupsEditUsersTabComponent extends BaseAgGrid implements OnInit, OnDestroy {
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;
  
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

  userIds: number[];
  users$: Observable<User[]>;
  usersInput$ = new Subject<string>();
  usersReqLoading: boolean;

  constructor(private userGroupSvc: UserGroupService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadSelectUsers();

    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Name', 'name', true, true),
      this.getColDef('Email', 'email', true, true),
      this.getStatusColDef('Status', 'status', 100, false, this.statusCell),
      this.getActionColDef('Action', '', 90, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.userGroupSvc.getUsers(this.userGroupVm.id, params);
    }

    this.setDataSource();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadSelectUsers() {
    this.users$ = concat(
      this.getUsersFn$(null),
      this.usersInput$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(_ => this.usersReqLoading = true),
        switchMap(searchStr => this.getUsersFn$(searchStr))
      )
    );
  }

  addUsers() {
    this.submitted = true;
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;
    this.userGroupSvc.addUsers(this.userGroupVm.id, this.userIds)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.form.reset();
        this.submitted = false;
        
        this.loadSelectUsers();
        this.refreshTable();
      }, errorResponse => {
        this.swalAlert('Error', errorResponse.error.message, 'error');
        this.isLoading = false;
      });
  }

  removeUser(id: number) {
    this.isLoading = true;
    this.userGroupSvc.removeUser(this.userGroupVm.id, id)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
        this.refreshTable();
      }, errorResponse => {
        this.swalAlert('Error', errorResponse.error.message, 'error');
        this.isLoading = false;
      });
  }

  trackByFn(user: User) {
    return user.id;
  }

  private getUsersFn$(searchStr?: string, ids?: number[]) {
    let params: any = { limit: 10, page: 1, type: 'formcontrol' };

    if (searchStr != null && searchStr != '')
      params.email = `contains:${searchStr}`;

    return this.userGroupSvc.getNotUsers(this.userGroupVm.id, params).pipe(
      tap(_ => this.usersReqLoading = false),
      map(response => response.data.data),
      catchError(() => of([])), // empty list on error
    )
  }
}
