import { Component, OnInit } from '@angular/core';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { Order } from 'app/modules/orders/models/order.model';
import { Workflow } from 'app/modules/workflows/models/workflow.model';
import { environment } from 'environments/environment';
import { FileDetail } from 'app/shared/models/filedetail.model';

@Component({
  selector: 'app-modal-orders-details',
  templateUrl: './modal-orders-details.component.html',
  styleUrls: ['./modal-orders-details.component.css']
})
export class ModalOrdersDetailsComponent implements OnInit {
  workflow: Workflow;
  order: Order;

  constructor(private ref: CustomOverlayRef<void, { workflow: Workflow, order: Order }>) {
  }

  ngOnInit() {
    this.workflow = this.ref.data.workflow;
    this.order = this.ref.data.order;
  }

  viewServerFile(fileDetail: FileDetail) {
    const fileType = fileDetail.name.split('.').pop();
    let url = fileDetail.path;

    console.log(fileType);

    if (fileType === 'pdf')
      url = `${document.location.origin}/pdf?url=${fileDetail.path}`
    
    window.open(url, '_blank');
  }

  close() {
    this.ref.close();
  }

  get dateFormat() {
    return environment.dateFormat;
  }
}
