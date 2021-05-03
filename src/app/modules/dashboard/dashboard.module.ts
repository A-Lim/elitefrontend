import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { DashboardRoutingModule } from 'app/modules/dashboard/dashboard.routing';
import { DashboardComponent } from 'app/modules/dashboard/dashboard.component'
import { WidgetGeneralComponent } from 'app/modules/dashboard/widget-general/widget-general.component';
import { WidgetOverDueSoonComponent } from 'app/modules/dashboard/widget-overdue-soon/widget-overdue-soon.component';

@NgModule({
  declarations: [
    DashboardComponent,
    WidgetGeneralComponent,
    WidgetOverDueSoonComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
