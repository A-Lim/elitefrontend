import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { OrderService } from 'app/modules/orders/orders.service';
import { WorkflowService } from 'app/modules/workflows/workflows.service';
import { Workflow } from 'app/modules/workflows/models/workflow.model';
import { Order } from 'app/modules/orders/models/order.model';
import { OrderVm } from 'app/modules/orders/models/order.model.vm';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.css']
})
export class OrdersEditComponent extends Base implements OnInit, OnDestroy {
  @ViewChild('form')
  form: NgForm;

  workflow: Workflow;
  order: Order;

  orderVm: OrderVm;

  constructor(private route: ActivatedRoute,
    private workflowSvc: WorkflowService,
    private orderSvc: OrderService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Create Order');
    this.orderVm = new OrderVm();
    this.route.params.subscribe(params => {
      this.loadWorkflowAndOrder(params['wid'], params['oid']);
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit() {
    this.submitted = true;
  
    // validate form
    if (!this.form.valid)
      return;

    this.isLoading = true;
    this.orderSvc.updateOrder(this.workflow.id, this.order.id, this.orderVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => { 
        this.isLoading = false;
        this.router.navigate([`admin/orders/${this.workflow.id}`]);
      }, _ => this.isLoading = false);
  }

  loadWorkflowAndOrder(wid: number, oid: number) {
    this.isLoading = true;

    const workflowReq = this.workflowSvc.getWorkflow(wid);
    const orderReq = this.orderSvc.getOrder(wid, oid);

    forkJoin([workflowReq, orderReq])
      .subscribe(response => {

        this.workflow = response[0].data;
        this.order = response[1].data;

        this.orderVm = <OrderVm> {
          id: this.order.id,
          iwo: this.order.iwo,
          company: this.order.company,
          description: this.order.description,
          quantity: this.order.quantity,
          remark: this.order.remark,
          status: this.order.status,
          delivery_date: this.order.delivery_date,
          files: this.order.files,
          uploadFiles: [],
          person_in_charge: this.order.person_in_charge
        };

        this.workflow.processes.forEach(process => {
          this.orderVm[process.code] = this.order[process.code];
        });

        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }
}
