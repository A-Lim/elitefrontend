import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { DashboardRoutingModule } from 'app/modules/dashboard/dashboard.routing';
import { DashboardComponent } from 'app/modules/dashboard/dashboard.component'

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
