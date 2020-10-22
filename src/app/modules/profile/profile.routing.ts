import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/guards/auth.guard';
import { ProfileComponent } from 'app/modules/profile/profile.component';

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
