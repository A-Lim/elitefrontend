import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { UsersRoutingModule } from 'app/modules/users/users.routing';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersEditGeneralTabComponent } from './users-edit/users-edit-general-tab/users-edit-general-tab.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UsersCreateComponent,
    UsersEditComponent,
    UsersEditGeneralTabComponent,
  ],
  imports: [
    UsersRoutingModule,
    SharedModule,
  ],
})
export class UsersModule { }
