import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { OrderService } from 'app/modules/orders/orders.service';
import { WorkflowService } from 'app/modules/workflows/workflows.service';
import { Workflow } from 'app/modules/workflows/models/workflow.model';
import { OrderVm } from 'app/modules/orders/models/order.model.vm';


@Component({
  selector: 'app-orders-create',
  templateUrl: './orders-create.component.html',
  styleUrls: ['./orders-create.component.css']
})
export class OrdersCreateComponent extends Base implements OnInit, OnDestroy {
  @ViewChild('form')
  form: NgForm;

  workflow: Workflow;
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
      this.loadWorkflow(params['wid']);
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
    this.orderSvc.createOrder(this.workflow.id, this.orderVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => { 
        this.isLoading = false;
        this.router.navigate([`admin/orders/${this.workflow.id}`]);
      }, _ => this.isLoading = false);
  }

  loadWorkflow(id: number) {
    this.isLoading = true;

    this.workflowSvc.getWorkflow(id)
      .subscribe(response => {
        this.workflow = response.data;
        
        this.workflow.processes.forEach(process => {
          this.orderVm[process.code] = process.default;
        });
        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }

}
