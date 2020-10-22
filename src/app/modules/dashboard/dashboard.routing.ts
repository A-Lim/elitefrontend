import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { DashboardComponent } from 'app/modules/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
