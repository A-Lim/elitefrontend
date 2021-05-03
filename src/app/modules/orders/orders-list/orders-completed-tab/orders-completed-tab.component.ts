import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectorRef, Input } from '@angular/core';
import { TitleCasePipe, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
import { Ability } from '@casl/ability';
import { CellClickedEvent, ColDef } from 'ag-grid-community';

import { BaseAgGrid } from 'app/shared/components/baseaggrid.component';
import { OrderService } from 'app/modules/orders/orders.service';
import { ModalService } from 'app/shared/services/modal.service';

import { Order } from 'app/modules/orders/models/order.model';
import { Workflow } from 'app/modules/workflows/models/workflow.model';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { TemplateRendererComponent } from 'app/shared/components/template-renderer.component';

import { ModalOrdersDetailsComponent } from 'app/modules/orders/modal-orders-details/modal-orders-details.component';
import { ModalOrdersProcessEditComponent } from 'app/modules/orders/modal-orders-process-edit/modal-orders-process-edit.component';

@Component({
  selector: 'orders-completed-tab',
  templateUrl: './orders-completed-tab.component.html',
  styleUrls: ['./orders-completed-tab.component.css'],
})
export class OrdersCompletedTabComponent extends BaseAgGrid implements OnInit, OnDestroy {
  @ViewChild('statusCell', { static: true }) statusCell: TemplateRef<any>;
  @ViewChild('actionsCell', { static: true }) actionsCell: TemplateRef<any>;
  
  @Input()
  workflow: Workflow;
  
  constructor(private ability: Ability, 
    private orderSvc: OrderService,
    private modalService: ModalService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildColumns();
    this.dataSourceCallBack = (params: any) => {
      params['status'] = 'equals:completed';
      return this.orderSvc.getOrders(this.workflow.id, params);
    }

    this.setDataSource();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  buildColumns() {
    this.gridOptions.defaultColDef.cellStyle = { 
      'white-space': 'normal', 
      'line-height': '14px',
      'text-align': 'center',
      'justify-content': 'center'
    };

    this.columnDefs = [
      {
        headerName: 'IWO',
        field: 'iwo',
        filter: true,
        sortable: true,
        suppressMenu: true,
        width: 90,
        onCellClicked: (event: CellClickedEvent) => {
          this.showFiles(event.data);
        },
      },
      {
        headerName: 'COMPANY',
        field: 'company',
        filter: true,
        sortable: true,
      },
      {
        headerName: 'DESC',
        field: 'description',
        filter: true,
        sortable: true,
      },
      {
        headerName: 'QTY',
        field: 'quantity',
        filter: true,
        sortable: true,
        width: 60,
      },
      {
        headerName: 'DLVR DATE',
        field: 'delivery_date',
        filter: 'agDateColumnFilter',
        sortable: true,
      },
      {
        headerName: 'REMARK',
        field: 'remark',
        filter: false,
        sortable: false,
      },
      {
        headerName: 'PIC',
        field: 'person_in_charge',
        filter: true,
        sortable: true,
        width: 90,
      },
      {
        headerName: 'STATUS',
        field: 'status',
        sortable: false,
        filter: false,
        suppressMenu: true,
        width: 100,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.statusCell
        },
      },
    ];

    if (this.ability.can('update', 'orders') || this.ability.can('delete', 'orders')) 
      this.columnDefs.push(this.getTemplateColDef('ACTION', '', 100, false ,this.actionsCell),);
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

  // updateOrderStatus(event: CellClickedEvent) {
  //   const colId = event.column.getColId();
  //   const data = {
  //     workflow: this.workflow,
  //     order: event.data,
  //   };

  //   const modal = this.modalService.open(ModalOrdersStatusEditComponent, data, ModalSize.Small);
  //   modal.afterClosed$.subscribe(res => {
  //     if (res.data)
  //       this.refreshTable();
  //   });
  // }
}
