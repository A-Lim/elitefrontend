import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from 'app/shared/components/layouts/admin/admin.layout.component';
import { DefaultLayoutComponent } from 'app/shared/components/layouts/default.layout.component.css/default.layout.component';
import { PageNotFoundComponent } from 'app/shared/pages/pagenotfound/pagenotfound.component';
import { ForbiddenComponent } from 'app/shared/components/forbidden/forbidden.component';

const routes: Routes = [
  { 
    path: '', 
    component: DefaultLayoutComponent,
    loadChildren: () => import('app/modules/auth/auth.module').then(m => m.AuthModule), 
  },
  { 
    path: 'pdf', 
    component: DefaultLayoutComponent,
    loadChildren: () => import('app/modules/pdfviewer/pdfviewer.module').then(m => m.PdfViewerModule), 
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { 
        path: 'admin/dashboard', 
        data: { breadcrumb: 'dashboard', module: 'dashboard' },
        loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule), 
      },
      { 
        path: 'admin/profile', 
        data: { breadcrumb: 'profile', module: 'profile' },
        loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule), 
      },
      { 
        path: 'admin/systemsettings', 
        data: { breadcrumb: 'system settings', module: 'system settings' },
        loadChildren: () => import('app/modules/systemsettings/systemsettings.module').then(m => m.SystemSettingsModule), 
      },
      { 
        path: 'admin/users', 
        data: { breadcrumb: 'users', module: 'users' },
        loadChildren: () => import('app/modules/users/users.module').then(m => m.UsersModule), 
      },
      { 
        path: 'admin/usergroups', 
        data: { breadcrumb: 'user groups', module: 'user groups' },
        loadChildren: () => import('app/modules/usergroups/usergroups.module').then(m => m.UserGroupsModule), 
      },
      { 
        path: 'admin/workflows', 
        data: { breadcrumb: 'workflows', module: 'workflows' },
        loadChildren: () => import('app/modules/workflows/workflows.module').then(m => m.WorkflowsModule), 
      },
      { 
        path: 'admin/orders', 
        data: { breadcrumb: 'orders', module: 'orders' },
        loadChildren: () => import('app/modules/orders/orders.module').then(m => m.OrdersModule), 
      },
    ]
  },
  {
    path: '404', 
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: PageNotFoundComponent
      }
    ]
  },
  {
    path: '**', redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
