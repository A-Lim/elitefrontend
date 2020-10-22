import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { ProfileRoutingModule } from 'app/modules/profile/profile.routing';
import { ProfileComponent } from 'app/modules/profile/profile.component';
import { ProfileGeneralTabComponent } from 'app/modules/profile/profile-general-tab/profile-general-tab.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileGeneralTabComponent,
  ],
  imports: [
    ProfileRoutingModule,
    SharedModule,
  ],
})
export class ProfileModule { }
