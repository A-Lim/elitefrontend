import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { WorkflowsListComponent } from 'app/modules/workflows/workflows-list/workflows-list.component';
import { WorkflowsCreateComponent } from 'app/modules/workflows/workflows-create/workflows-create.component';
import { WorkflowsEditComponent } from 'app/modules/workflows/workflows-edit/workflows-edit.component';

const routes: Routes = [
  { 
    path: '', 
    component: WorkflowsListComponent, 
    data: { breadcrumb: 'workflows' },
    canActivate: [AuthGuard] 
  },
  { 
    path: 'create', 
    component: WorkflowsCreateComponent, 
    data: { breadcrumb: 'create workflows' },
    canActivate: [AuthGuard] 
  },
  { 
    path: ':id', 
    component: WorkflowsEditComponent, 
    data: { breadcrumb: 'edit workflows' },
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowsRoutingModule { }
