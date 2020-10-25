import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { OrdersListComponent } from 'app/modules/orders/orders-list/orders-list.component';
import { OrdersCreateComponent } from './orders-create/orders-create.component';
import { OrdersEditComponent } from './orders-edit/orders-edit.component';

const routes: Routes = [
  { 
    path: ':wid', 
    component: OrdersListComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: ':wid/create', 
    component: OrdersCreateComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: ':wid/:oid', 
    component: OrdersEditComponent,
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
