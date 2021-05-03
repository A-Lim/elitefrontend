import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { OrderService } from 'app/modules/orders/orders.service';
import { WorkflowService } from 'app/modules/workflows/workflows.service';
import { Workflow } from 'app/modules/workflows/models/workflow.model';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { OrdersListTableComponent } from './orders-list-table/orders-list-table.component';

@Component({
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersListComponent extends Base implements OnInit, OnDestroy {
  @ViewChild('fileUpload')
  fileUpload: ElementRef;
  
  workflow: Workflow;
  isInProgressTabLoaded: boolean = false;
  isCompletedTabLoaded: boolean = false;
  
  constructor(private workflowSvc: WorkflowService,
    private orderSvc: OrderService,
    private route: ActivatedRoute) { 
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
        // this.buildColumns();
      
        // this.dataSourceCallBack = (params: any) => {
        //   params['status'] = 'equals:in progress';
        //   return this.orderSvc.getOrders(this.workflow.id, params);
        // }
        // this.setDataSource();
        // this.agGrid.api.sizeColumnsToFit();
        // this.agGrid.api.setDatasource(this.dataSource);

        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }

  onTabClick(tab: OrdersTab) {
    switch (tab) {
      case OrdersTab.InProgress:
        this.isInProgressTabLoaded = true;
        break;
      
      case OrdersTab.Completed:
        this.isCompletedTabLoaded = true;
        break;

      default:
        break;
    }
  }

  fullScreenMode() {
    this.modalSvc.open(OrdersListTableComponent, this.workflow, ModalSize.Full);
  }

  importOrders(fileList: FileList) {
    if (fileList.length == 0)
      this.swalAlert('Error', 'No files found.' ,'error');

    const file = fileList[0];
    this.orderSvc.importOrders(this.workflow.id, file)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
      }, error => {
        const errors = error.error.errors;

        const errorMsg = errors.join('. ');
        this.swalAlert('Error', errorMsg, 'error')
      });

    // reset file input
    this.fileUpload.nativeElement.value = null;

  }

  get OrdersTab() {
    return OrdersTab;
  }
}

enum OrdersTab {
  InProgress,
  Completed
}