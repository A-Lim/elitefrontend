import { Component, OnInit } from '@angular/core';
import { CustomOverlayRef } from 'app/shared/helpers/customoverlayref';
import { Order } from 'app/modules/orders/models/order.model';

@Component({
  selector: 'app-modal-orders-details',
  templateUrl: './modal-orders-details.component.html',
  styleUrls: ['./modal-orders-details.component.css']
})
export class ModalOrdersDetailsComponent implements OnInit {
  order: Order;

  constructor(private ref: CustomOverlayRef<void, Order>) {
  }

  ngOnInit() {
    this.order = this.ref.data;
  }

  close() {
    this.ref.close();
  }

}
