import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { TitleCasePipe, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';

import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { OrderService } from 'app/modules/orders/orders.service';
import { ModalService } from 'app/shared/services/modal.service';
import { WorkflowService } from 'app/modules/workflows/workflows.service';

import { Order } from 'app/modules/orders/models/order.model';
import { Workflow } from 'app/modules/workflows/models/workflow.model';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { TemplateRendererComponent } from 'app/shared/components/template-renderer.component';

import { ModalOrdersDetailsComponent } from 'app/modules/orders/modal-orders-details/modal-orders-details.component';
import { ModalOrdersProcessEditComponent } from 'app/modules/orders/modal-orders-process-edit/modal-orders-process-edit.component';

@Component({
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  providers: [TitleCasePipe, DatePipe]
})
export class OrdersListComponent extends BaseAgGrid implements OnInit, OnDestroy {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('iwoCell', { static: true }) iwoCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  
  public workflow: Workflow;

  public defaultColDef = {
    sortable: false,
    filter: false,
    floatingFilter: true,
    minWidth: 100,
    resizable: true,
  };
  
  constructor(private workflowSvc: WorkflowService, 
    private orderSvc: OrderService, 
    private route: ActivatedRoute,
    private modalService: ModalService,
    private titleCasePipe: TitleCasePipe,
    private datePipe: DatePipe) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Orders');
    this.loadWorkflow();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadWorkflow() {
    this.isLoading = true;
    this.route.params
      .pipe(switchMap(params => this.workflowSvc.getWorkflow(params['wid'])))
      .subscribe(response => {
        this.workflow = response.data;
        this.buildColumns();

        this.dataSourceCallBack = (params: any) => {
          return this.orderSvc.getOrders(this.workflow.id, params);
        }
        this.setDataSource();
        this.agGrid.api.sizeColumnsToFit();
        this.agGrid.api.setDatasource(this.dataSource);

        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }

  buildColumns() {
    const processesDef = [];
    const processes = this.workflow.processes;
    for (let i = 0; i < processes.length; i++) {
      const process = processes[i];
      const processLabel = this.titleCasePipe.transform(process.name);
      const processName = process.name.split(' ').join('_').toLowerCase();

      const processColDef = <ColDef> {
        headerName: processLabel,
        field: processName,
        filter: true,
        sortable: true,
        suppressMenu: true,
        filterParams: { suppressAndOrCondition: true, filterOptions: ['contains', 'equals'] },
        onCellClicked: (event: CellClickedEvent) => {
          this.updateProcessStatus(event, processLabel);
        },
        cellStyle: (params) => {
          switch (params.value) {
            case 'Pending':
              return { backgroundColor: '#FDAC41' };

            case 'None':
              return { backgroundColor: '#8494A7' };

            case 'Completed':
              return { backgroundColor: '#39DA8A' };
          }
        }
      };
      processesDef.push(processColDef);
    }

    this.columnDefs = [
      {
        headerName: 'IWO',
        field: 'iwo',
        filter: true,
        sortable: true,
        suppressMenu: true,
        pinned: 'left',
        filterParams: { suppressAndOrCondition: true, filterOptions: ['contains', 'equals'] },
        onCellClicked: (event: CellClickedEvent) => {
          this.showFiles(event.data);
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.iwoCell
        },
      },
      this.getColDef('Customer', 'customer', true, true),
      {
        headerName: 'Delivery Date',
        field: 'delivery_date',
        filter: 'agDateColumnFilter',
        sortable: true,
        suppressMenu: true,
        pinned: false,
        floatingFilterComponentParams: { suppressFilterButton: true },
        cellRenderer: (data) => {
          return this.datePipe.transform(data.value, 'dd-MM-yyyy');
        }
      },
      ...processesDef,
      this.getColDef('Remark', 'remark', false, false),
      // this.getStatusColDef('Status', 'status', 100, 'right', this.statusCell),
      this.getTemplateColDef('Action', '', 90, 'right' ,this.actionsCell),
    ];
  }

  delete(id: number) {
    this.swalConfirm('Confirm', 'Are you sure you want to delete this order?', 'warning', 'Delete')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.orderSvc.deleteOrder(this.workflow.id, id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => this.agGrid.gridOptions.api.refreshInfiniteCache());
  }

  showFiles(order: Order) {
    const modal = this.modalService.open(ModalOrdersDetailsComponent, order);
    modal.afterClosed$.subscribe(res => {
    });
  }

  updateProcessStatus(event: CellClickedEvent, processName: string) {
    const rowId = event.node.id;
    const colId = event.column.getColId();

    // find process details
    const process = this.workflow.processes.filter(x => x.name == processName)[0];
    const data = {
      workflow: this.workflow,
      order: event.data,
      process: process
    };

    const modal = this.modalService.open(ModalOrdersProcessEditComponent, data, ModalSize.Small);
    modal.afterClosed$.subscribe(res => {
      if (res.data) {
        const rowNode = this.agGrid.api.getRowNode(event.node.id);
        rowNode.setDataValue(colId, res.data);
      }
    });
  }
}
