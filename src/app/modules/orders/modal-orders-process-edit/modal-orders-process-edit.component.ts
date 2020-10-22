import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { OrderService } from 'app/modules/orders/orders.service';
import { Order } from 'app/modules/orders/models/order.model';
import { Process, Workflow } from 'app/modules/workflows/models/workflow.model';

@Component({
  selector: 'app-modal-orders-process-edit',
  templateUrl: './modal-orders-process-edit.component.html',
  styleUrls: ['./modal-orders-process-edit.component.css']
})
export class ModalOrdersProcessEditComponent extends Base implements OnInit, OnDestroy {
  workflow: Workflow;
  order: Order;
  process: Process;
  
  constructor(private ref: CustomOverlayRef<string, { workflow: Workflow, order: Order, process: Process }>,
    private orderSvc: OrderService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.workflow = this.ref.data.workflow;
    this.order = this.ref.data.order;
    this.process = this.ref.data.process;
  }
  
  ngOnDestroy() {
    super.ngOnDestroy();
  }

  close() {
    this.ref.close();
  }

  updateProcess(status: string) {
    this.isLoading = true;
    const data = { process_id: this.process.id, status };
    this.orderSvc.updateOrderProcess(this.workflow.id, this.order.id, data)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(response => {
        this.isLoading = false;
        this.ref.close(status);
      }, _ => this.isLoading = false );
  }
}
