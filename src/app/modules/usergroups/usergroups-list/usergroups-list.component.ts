import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

import { UserGroupService } from 'app/modules/usergroups/usergroups.service';
import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'usergroups-list',
  templateUrl: './usergroups-list.component.html',
  styleUrls: ['./usergroups-list.component.css']
})
export class UserGroupsListComponent extends BaseAgGrid implements OnInit {
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;

  constructor(public userGroupSvc: UserGroupService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('User Groups');
    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Name', 'name', true, true),
      this.getColDef('Code', 'code', true, true),
      this.getNumberColDef('Users count', 'users_count'),
      this.getStatusColDef('Status', 'status', 100, false, this.statusCell),
      this.getActionColDef('Action', '', 90, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.userGroupSvc.getUserGroups(params);
    }

    this.setDataSource();
  }

  delete(id: number) {
    this.swalConfirm('Confirm', 'Are you sure you want to delete this usergroup?', 'warning', 'Delete')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.userGroupSvc.deleteUserGroup(id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => this.refreshTable());
  }
}
