import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ViewEncapsulation, Input, Optional, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, filter, takeUntil, debounceTime } from 'rxjs/operators';
import { Ability } from '@casl/ability';
import { CellClickedEvent, ColDef, ColumnResizedEvent, ValueFormatterParams } from 'ag-grid-community';

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
export class OrdersListTableComponent extends BaseAgGrid implements OnInit, OnDestroy, OnChanges {
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

    this.orderSvc.reload$
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => this.refreshTable());
      

    this.initGridOptions();
    this.buildColumns();
    this.dataSourceCallBack = (params: any) => {
      params['status'] = 'equals:in progress';
      return this.orderSvc.getOrders(this.workflow.id, params);
    }

    this.setDataSource();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.workflow) {
      this.initGridOptions();
      this.buildColumns();
      this.dataSourceCallBack = (params: any) => {
        params['status'] = 'equals:in progress';
        return this.orderSvc.getOrders(this.workflow.id, params);
      }
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  initGridOptions() {
    this.gridOptions.cacheBlockSize = 50;
    this.gridOptions.paginationPageSize = 50;
    
    this.gridOptions.onColumnResized = (params: ColumnResizedEvent) => {
      const columnSetting = <ColumnSettingVm> {
        code: params.column.getColDef().field,
        width: params.column.getActualWidth(),
      }
      this._updateColumn.next(columnSetting);
    };

    this.gridOptions.defaultColDef.cellStyle = { 
      'line-height': '14px',
      'white-space': 'normal',
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
        valueFormatter: (params: ValueFormatterParams) => {
          switch (params.value) {
            case 'Pending':
              return 'PEND'

            case 'None':
              return 'NONE';

            case 'Done':
              return 'DONE';

            case 'Urgent':
              return 'UGNT';
          }
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

            case 'Done':
              return { backgroundColor: '#39DA8A' };

            case 'Urgent':
              return { backgroundColor: '#FF5B5C' };
          }
        },
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
        width: 60,
        onCellClicked: (event: CellClickedEvent) => {
          this.showFiles(event.data);
        },
      },
      {
        headerName: 'COMPANY',
        field: 'company',
        filter: true,
        sortable: true,
        width: 75,
        pinned: 'left',
        cellClass: 'align-top',
      },
      {
        headerName: 'DESC',
        field: 'description',
        filter: true,
        sortable: true,
        width: 80,
        pinned: 'left',
        cellClass: 'align-top'
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
        width: 80,
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
        cellClass: 'align-top'
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
    const data = { workflow: this.workflow, order: order };
    const modal = this.modalService.open(ModalOrdersDetailsComponent, data);
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

  routeTo(path: string, id?: string) {
    this.navigateTo(path, id);

    if (this.isModalLayout)
      this.close();
  }
}