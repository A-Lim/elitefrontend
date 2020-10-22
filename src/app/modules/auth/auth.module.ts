import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { LoginComponent } from 'app/modules/auth/login/login.component';
import { RegisterComponent } from 'app/modules/auth/register/register.component';
import { ForgotPasswordComponent } from 'app/modules/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'app/modules/auth/reset-password/reset-password.component';
import { AuthRoutingModule } from './auth.routing';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,
  ],
})
export class AuthModule { }
