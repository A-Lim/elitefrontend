import { Component, OnInit } from '@angular/core';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';

import { ModalService } from 'app/shared/services/modal.service';
import { ModalSize } from 'app/shared/models/modalsize.enum';
import { Order } from 'app/modules/orders/models/order.model';
import { Workflow } from 'app/modules/workflows/models/workflow.model';
import { ModalOrdersProcessEditComponent } from 'app/modules/orders/modal-orders-process-edit/modal-orders-process-edit.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-modal-orders-details',
  templateUrl: './modal-orders-details.component.html',
  styleUrls: ['./modal-orders-details.component.css']
})
export class ModalOrdersDetailsComponent implements OnInit {
  workflow: Workflow;
  order: Order;

  constructor(private ref: CustomOverlayRef<void, { workflow: Workflow, order: Order }>,
    private modalService: ModalService) {
  }

  ngOnInit() {
    this.workflow = this.ref.data.workflow;
    this.order = this.ref.data.order;
  }

  // updateProcessStatus(processCode: string) {
  //   // find process details
  //   const process = this.workflow.processes.filter(x => x.code == processCode)[0];
  //   const data = {
  //     workflow: this.workflow,
  //     order: this.order,
  //     process: process
  //   };

  //   const modal = this.modalService.open(ModalOrdersProcessEditComponent, data, ModalSize.Small);
  //   modal.afterClosed$.subscribe(res => {
  //     if (res.data) {
  //       // const rowNode = this.agGrid.api.getRowNode(event.node.id);
  //       // rowNode.setDataValue(colId, res.data);
  //     }
  //   });
  // }

  close() {
    this.ref.close();
  }

  get dateFormat() {
    return environment.dateFormat;
  }
}
