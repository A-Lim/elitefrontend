import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { OrdersRoutingModule } from 'app/modules/orders/orders.routing';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersCreateComponent } from './orders-create/orders-create.component';
import { OrdersEditComponent } from './orders-edit/orders-edit.component';
import { OrdersListTableComponent } from './orders-list/orders-list-table/orders-list-table.component';
import { OrdersCompletedTabComponent } from './orders-list/orders-completed-tab/orders-completed-tab.component';

import { OrderIWOExistsValidator } from './validators/orderiwoexists.validator';
import { ModalOrdersDetailsComponent } from './modal-orders-details/modal-orders-details.component';
import { ModalOrdersProcessEditComponent } from './modal-orders-process-edit/modal-orders-process-edit.component';
import { ModalOrdersStatusEditComponent } from './modal-orders-status-edit/modal-orders-status-edit.component';

@NgModule({
  declarations: [
    OrdersListComponent,
    OrdersCreateComponent,
    OrdersEditComponent,

    OrdersListTableComponent,
    OrdersCompletedTabComponent,
    OrderIWOExistsValidator,
    
    ModalOrdersDetailsComponent,
    ModalOrdersProcessEditComponent,
    ModalOrdersStatusEditComponent
  ],
  imports: [
    OrdersRoutingModule,
    SharedModule,
  ],
})
export class OrdersModule { }
