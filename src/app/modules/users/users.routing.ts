import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { UsersListComponent } from 'app/modules/users/users-list/users-list.component';
import { UsersCreateComponent } from 'app/modules/users/users-create/users-create.component';
import { UsersEditComponent } from 'app/modules/users/users-edit/users-edit.component';

const routes: Routes = [
  { 
    path: '', 
    component: UsersListComponent, 
    data: { breadcrumb: 'users' },
    canActivate: [AuthGuard] 
  },
  { 
    path: 'create', 
    component: UsersCreateComponent, 
    data: { breadcrumb: 'create users' },
    canActivate: [AuthGuard] 
  },
  { 
    path: ':id', 
    component: UsersEditComponent, 
    data: { breadcrumb: 'edit users' },
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
