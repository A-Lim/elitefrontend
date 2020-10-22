import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { SystemSettingsRoutingModule } from './systemsettings.routing';
import { SystemSettingsComponent } from 'app/modules/systemsettings/systemsettings.component';
import { SystemSettingsGeneralTabComponent } from 'app/modules/systemsettings/systemsettings-general-tab/systemsettings-general-tab.component';
import { SystemSettingsAuthTabComponent } from './systemsettings-auth-tab/systemsettings-auth-tab.component';

@NgModule({
  declarations: [
    SystemSettingsComponent,
    SystemSettingsGeneralTabComponent,
    SystemSettingsAuthTabComponent,
  ],
  imports: [
    SystemSettingsRoutingModule,
    SharedModule,
  ],
})
export class SystemSettingsModule { }
