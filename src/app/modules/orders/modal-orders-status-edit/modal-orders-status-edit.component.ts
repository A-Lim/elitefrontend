import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { OrderService } from 'app/modules/orders/orders.service';
import { Order } from 'app/modules/orders/models/order.model';
import { Process, Workflow } from 'app/modules/workflows/models/workflow.model';

@Component({
  selector: 'app-modal-orders-status-edit',
  templateUrl: './modal-orders-status-edit.component.html',
  styleUrls: ['./modal-orders-status-edit.component.css']
})
export class ModalOrdersStatusEditComponent extends Base implements OnInit, OnDestroy {
  workflow: Workflow;
  order: Order;
  statuses: string[] = ['in progress', 'completed']
  
  constructor(private ref: CustomOverlayRef<string, { workflow: Workflow, order: Order, process: Process }>,
    private orderSvc: OrderService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.workflow = this.ref.data.workflow;
    this.order = this.ref.data.order;
  }
  
  ngOnDestroy() {
    super.ngOnDestroy();
  }

  close() {
    this.ref.close();
  }

  updateStatus(status: string) {
    console.log(status);
    this.isLoading = true;
    this.orderSvc.updateOrderStatus(this.workflow.id, this.order.id, status)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(response => {
        this.isLoading = false;
        this.ref.close(status);
      }, _ => this.isLoading = false );
  }
}
