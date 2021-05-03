import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ViewEncapsulation, Input, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, filter, takeUntil, debounceTime } from 'rxjs/operators';
import { Ability } from '@casl/ability';
import { CellClickedEvent, ColDef, ColumnResizedEvent } from 'ag-grid-community';

import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { OrderService } from 'app/modules/orders/orders.service';
import { ModalService } from 'app/shared/services/modal.service';
import { WorkflowService } from 'app/modules/workflows/workflows.service';

import { Order } from 'app/modules/orders/models/order.model';
import { ColumnSettingVm } from 'app/modules/orders/models/columnsetting.model.vm';
import { Workflow } from 'app/modules/workflows/models/workflow.model';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { TemplateRendererComponent } from 'app/shared/components/template-renderer.component';

import { ModalOrdersDetailsComponent } from 'app/modules/orders/modal-orders-details/modal-orders-details.component';
import { ModalOrdersProcessEditComponent } from 'app/modules/orders/modal-orders-process-edit/modal-orders-process-edit.component';
import { ModalOrdersStatusEditComponent } from 'app/modules/orders/modal-orders-status-edit/modal-orders-status-edit.component';

@Component({
  selector: 'orders-list-table',
  templateUrl: './orders-list-table.component.html',
  styleUrls: ['./orders-list-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersListTableComponent extends BaseAgGrid implements OnInit, OnDestroy {
  @ViewChild('processCell', { static: true }) processCell: TemplateRef<any>;
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  
  @Input()
  workflow: Workflow;
  isModalLayout: boolean = false;

  private _updateColumn = new Subject<ColumnSettingVm>();
  updateColumn$ = this._updateColumn.asObservable();
  
  constructor(private ability: Ability,
    private workflowSvc: WorkflowService,
    private orderSvc: OrderService,
    private modalService: ModalService,
    @Optional() private ref: CustomOverlayRef<string, Workflow>) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.workflow) {
      this.isModalLayout = true;
      this.workflow = this.ref.data;
    }
    
    this.updateColumn$.pipe(
      takeUntil(this.destroy$),
      debounceTime(200),
      switchMap(data => this.workflowSvc.updateColumnWidth(this.workflow.id, data))
    ).subscribe();

    this.initGridOptions();
    this.buildColumns();
    this.dataSourceCallBack = (params: any) => {
      params['status'] = 'equals:in progress';
      return this.orderSvc.getOrders(this.workflow.id, params);
    }

    this.setDataSource();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  initGridOptions() {
    this.gridOptions.onColumnResized = (params: ColumnResizedEvent) => {
      const columnSetting = <ColumnSettingVm> {
        code: params.column.getColDef().field,
        width: params.column.getActualWidth(),
      }
      this._updateColumn.next(columnSetting);
    };

    this.gridOptions.defaultColDef.cellStyle = { 
      'white-space': 'normal', 
      'line-height': '14px',
      'text-align': 'center',
      'justify-content': 'center'
    };
  }

  onGridReady(params) {
    params.api.setDatasource(this.dataSource);
  }

  buildColumns() {
    const processesDef = [];
    const processes = this.workflow.processes;
    for (let i = 0; i < processes.length; i++) {
      const process = processes[i];
      const processLabel = process.name.toUpperCase();

      const processColDef = <ColDef> {
        headerName: processLabel,
        field: process.code,
        filter: true,
        sortable: true,
        width: process.width,
        cellClass: 'process-cell',
        headerClass: 'process-cell-header',
        pinned: process.pinned,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.processCell
        },
        onCellClicked: (event: CellClickedEvent) => {
          this.updateProcessStatus(event, process.code);
        },
        cellStyle: (params) => {
          switch (params.value) {
            case 'Pending':
              return { backgroundColor: '#FDAC41' };

            case 'None':
              return { backgroundColor: '#475F7B', color: '#FFFFFF' };

            case 'Completed':
              return { backgroundColor: '#39DA8A' };

            case 'Urgent':
              return { backgroundColor: '#FF5B5C' };
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
        width: 50,
        onCellClicked: (event: CellClickedEvent) => {
          this.showFiles(event.data);
        },
      },
      {
        headerName: 'COMPANY',
        field: 'company',
        filter: true,
        sortable: true,
        width: 70,
        pinned: 'left',
      },
      {
        headerName: 'DESC',
        field: 'description',
        filter: true,
        sortable: true,
        width: 80,
        pinned: 'left',
      },
      {
        headerName: 'QTY',
        field: 'quantity',
        filter: true,
        sortable: true,
        width: 40,
        pinned: 'left',
      },
      {
        headerName: 'D DATE',
        field: 'delivery_date',
        filter: 'agDateColumnFilter',
        sortable: true,
        width: 75,
        pinned: 'left',
      },
      ...processesDef,
      {
        headerName: 'REMARK',
        field: 'remark',
        filter: false,
        sortable: false,
        pinned: 'right',
        width: 80,
      },
      {
        headerName: 'PIC',
        field: 'person_in_charge',
        filter: true,
        sortable: true,
        pinned: 'right',
        width: 60,
      },
      {
        headerName: 'STATUS',
        field: 'status',
        sortable: false,
        filter: false,
        suppressMenu: true,
        width: 80,
        pinned: 'right',
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.statusCell
        },
        onCellClicked: (event: CellClickedEvent) => {
          if (this.ability.can('update', 'orders')) 
            this.updateOrderStatus(event);
        },
      },
    ];

    if (this.ability.can('update', 'orders') || this.ability.can('delete', 'orders')) 
      this.columnDefs.push(this.getTemplateColDef('ACTION', '', 80, 'right' ,this.actionsCell));
  }

  delete(id: number) {
    this.swalConfirm('Confirm', 'Are you sure you want to delete this order?', 'warning', 'Delete')
      .pipe(
        filter(isConfirmed => isConfirmed),
        switchMap(_ => this.orderSvc.deleteOrder(this.workflow.id, id)),
        switchMap(response => this.swalAlert('Success', response.message, 'success'))
      ).subscribe(_ => this.refreshTable());
  }

  showFiles(order: Order) {
    const modal = this.modalService.open(ModalOrdersDetailsComponent, order);
    modal.afterClosed$.subscribe(res => {
    });
  }

  updateProcessStatus(event: CellClickedEvent, processCode: string) {
    const colId = event.column.getColId();

    // find process details
    const process = this.workflow.processes.filter(x => x.code == processCode)[0];
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

  updateOrderStatus(event: CellClickedEvent) {
    const colId = event.column.getColId();
    const data = {
      workflow: this.workflow,
      order: event.data,
    };

    const modal = this.modalService.open(ModalOrdersStatusEditComponent, data, ModalSize.Small);
    modal.afterClosed$.subscribe(res => {
      if (res.data)
        this.refreshTable();
    });
  }

  close() {
    this.ref.close();
  }
}