import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { Base } from 'app/shared/components/base.component';
import { SystemSettingService } from 'app/modules/systemsettings/systemsettings.service';
import { SystemSettingModule } from './models/systemsettingmodule.model';
import { SystemSettingVm } from './models/systemsetting.model.vm';

@Component({
  selector: 'app-systemsettings',
  templateUrl: './systemsettings.component.html',
  styleUrls: ['./systemsettings.component.css']
})
export class SystemSettingsComponent extends Base implements OnInit, OnDestroy {
  systemSettingModules: SystemSettingModule[];
  systemSettingVm: SystemSettingVm;

  allTabsValid: boolean;

  // track tab status
  generalTabValid: boolean;
  authTabValid: boolean;

  constructor(private systemsettingSvc: SystemSettingService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('System Settings');
    this.allTabsValid = true;
    this.generalTabValid = true;
    this.authTabValid = true;

    this.systemsettingSvc.getSystemSettings()
      .subscribe(result => {
        this.systemSettingModules = result.data;
        this.mapSystemSettingVm(result.data);
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onFormStatusChange(tab: SystemSettingTab, isValid: boolean) {
    switch (tab) {
      case SystemSettingTab.General:
        this.generalTabValid = isValid;
        break;
      
      case SystemSettingTab.Auth:
        this.authTabValid = isValid;
        break;
    }

    this.allTabsValid = this.generalTabValid &&
                        this.authTabValid;
  }

  onSubmit() {
    this.submitted = true;
  
    // validate form
    if (!this.allTabsValid)
      return;

    this.isLoading = true;
    this.systemsettingSvc.updateSystemSettings(this.systemSettingVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
        this.isLoading = false;
      }, _ => { this.isLoading = false; });
  }

  get SystemSettingTab() {
    return SystemSettingTab;
  }

  private mapSystemSettingVm(systemSettingModules: SystemSettingModule[]) {
    this.systemSettingVm = new SystemSettingVm();

    for (let i = 0; i < systemSettingModules.length; i++) {
      const module = systemSettingModules[i];
      for (let j = 0; j < module.systemsettings.length; j++) {
        const systemSetting = module.systemsettings[j];
        this.systemSettingVm[systemSetting.code] = systemSetting.value;
      }
    }
  }
}

enum SystemSettingTab {
  General,
  Auth
}