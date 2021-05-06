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
  isImporting: boolean = false;
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

    this.isImporting = true;
    this.orderSvc.importOrders(this.workflow.id, file)
      .subscribe(response => {
        this.swalAlert('Success', response.message, 'success');
        this.isImporting = false;
        this.orderSvc.reloadOrders();
      }, error => {
        this.isImporting = false;
        const errors = error.error.errors;
        let errorDesc = [];

        for (const key in errors) {
          errors[key].forEach(error => errorDesc.push(error));
        }

        const html = this.errorsHTMLTable(errorDesc);
        this.swalAlert('Error', html, 'error');
      });

    // reset file input
    this.fileUpload.nativeElement.value = null;
  }

  private errorsHTMLTable(errors: string[]) {
    const rowsHtml = errors.map((value, index) => `<tr>
      <td class="small">${index + 1}</td>
      <td class="small">${value}</td>
    </tr>`).join('');

    const html = `
      <table class="table table-sm table-bordered">
        <thead>
          <tr><th>#</th><th>Errors</th></tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
    return html;
  }

  get OrdersTab() {
    return OrdersTab;
  }
}

enum OrdersTab {
  InProgress,
  Completed
}