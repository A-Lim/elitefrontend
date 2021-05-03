import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

import { WorkflowService } from 'app/modules/workflows/workflows.service';
import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'workflows-list',
  templateUrl: './workflows-list.component.html',
  styleUrls: ['./workflows-list.component.css']
})
export class WorkflowsListComponent extends BaseAgGrid implements OnInit {
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;
  
  constructor(private workflowSvc: WorkflowService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Workflows');
    this.columnDefs = [
      this.getIndexColDef(),
      this.getColDef('Name', 'name', true, true),
      this.getNumberColDef('No. Processes', 'processes_count', false, false),
      this.getStatusColDef('Status', 'status', 100, false, this.statusCell),
      this.getActionColDef('Action', '', 90, this.actionsCell),
    ];

    this.dataSourceCallBack = (params: any) => {
      return this.workflowSvc.getWorkflows(params);
    }

    this.setDataSource();
  }

  delete(id: number) {
    this.swalConfirm('Confirm', 'Are you sure you want to delete this workflow? Action cannot be undone.', 'warning', 'Delete')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.workflowSvc.deleteWorkflow(id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => this.refreshTable());
  }

  activate(id: number) {
    this.swalConfirm('Confirm', 'Are you sure you want to activate this workflow?', 'warning', 'Activate')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.workflowSvc.activateWorkflow(id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => this.refreshTable());
  }

  deactivate(id: number) {
    this.swalConfirm('Confirm', 'Are you sure you want to deactivate this workflow?', 'warning', 'Deactivate')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.workflowSvc.deactivateWorkflow(id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => this.refreshTable());
  }
}
