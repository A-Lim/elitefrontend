import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestGuard } from 'app/core/guards/guest.guard';
import { LoginComponent } from 'app/modules/auth/login/login.component';
import { RegisterComponent } from 'app/modules/auth/register/register.component';
import { VerifyEmailComponent } from 'app/modules/auth/verify-email/verify-email.component';
import { ResetPasswordComponent } from 'app/modules/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from 'app/modules/auth/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'verify-email', component: VerifyEmailComponent, canActivate: [GuestGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [GuestGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [GuestGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
