import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { OrdersRoutingModule } from 'app/modules/orders/orders.routing';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersCreateComponent } from './orders-create/orders-create.component';
import { OrdersEditComponent } from './orders-edit/orders-edit.component';

import { OrderIWOExistsValidator } from './validators/orderiwoexists.validator';
import { ModalOrdersDetailsComponent } from './modal-orders-details/modal-orders-details.component';
import { ModalOrdersProcessEditComponent } from './modal-orders-process-edit/modal-orders-process-edit.component';

@NgModule({
  declarations: [
    OrdersListComponent,
    OrdersCreateComponent,
    OrdersEditComponent,
    OrderIWOExistsValidator,
    
    ModalOrdersDetailsComponent,
    ModalOrdersProcessEditComponent
  ],
  imports: [
    OrdersRoutingModule,
    SharedModule,
  ],
})
export class OrdersModule { }
