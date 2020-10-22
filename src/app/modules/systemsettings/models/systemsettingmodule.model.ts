import { SystemSetting } from 'app/modules/systemsettings/models/systemsetting.model';

export interface SystemSettingModule {
  id: number;
  name: string;
  description: string;
  systemsettings: SystemSetting[];
}