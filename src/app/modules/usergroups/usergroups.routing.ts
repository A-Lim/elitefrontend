import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { UserGroupsListComponent } from 'app/modules/usergroups/usergroups-list/usergroups-list.component';
import { UserGroupsEditComponent } from 'app/modules/usergroups/usergroups-edit/usergroups-edit.component';
import { UserGroupsCreateComponent } from 'app/modules/usergroups/usergroups-create/usergroups-create.component';

const routes: Routes = [
  { 
    path: '', 
    component: UserGroupsListComponent, 
    data: { breadcrumb: 'user groups' },
    canActivate: [AuthGuard] 
  },
  { 
    path: 'create', 
    component: UserGroupsCreateComponent, 
    data: { breadcrumb: 'create user group' },
    canActivate: [AuthGuard] 
  },
  {
    path: ':id', 
    component: UserGroupsEditComponent, 
    data: { breadcrumb: 'edit user group' },
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGroupsRoutingModule { }
