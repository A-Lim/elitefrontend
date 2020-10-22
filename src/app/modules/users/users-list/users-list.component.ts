import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { UserService } from 'app/modules/users/users.service';
import { pipe } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent extends BaseAgGrid implements OnInit, OnDestroy {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;

  constructor(private userSvc: UserService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Users');
    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Name', 'name', true, true),
      this.getColDef('Email', 'email', true, true),
      this.getStatusColDef('Status', 'status', 100, false, this.statusCell),
      this.getActionColDef('Action', '', 90, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.userSvc.getUsers(params);
    }

    this.setDataSource();
  }

  resetPassword(id: number) {
    this.swalConfirm('Confirm', 'Are you sure you want to reset password for this user?', 'warning', 'Reset Password')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.userSvc.resetUserPassword(id)),
        switchMap(response => this.swalAlert('Success', 'New user password is "' + response.data + '"', 'success'))
      ).subscribe();
  }
}
