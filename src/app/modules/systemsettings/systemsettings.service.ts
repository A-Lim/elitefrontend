import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { SystemSettingVm } from 'app/modules/systemsettings/models/systemsetting.model.vm';
import { SystemSettingModule } from 'app/modules/systemsettings/models/systemsettingmodule.model';

@Injectable({ providedIn: 'root' })
export class SystemSettingService {
  private systemSettingUrl = `${environment.apiUrl}/api/${environment.apiVersion}/systemsettings`;

  constructor(private http: HttpClient) {
  }

  getSystemSettings() {
    return this.http.get<ResponseResult<SystemSettingModule[]>>(`${this.systemSettingUrl}`);
  }

  allowPublicRegistration() {
    return this.http.get<ResponseResult<boolean>>(`${this.systemSettingUrl}/allowpublicregistration`);
  }

  // /****** Users ******/
  // getUsers(qParams: any) {
  //   return this.http.get<ResponseResult<PaginationResponse<User>>>(`${this.userUrl}`, { params: qParams });
  // }

  // getUser(id: number) {
  //   return this.http.get<ResponseResult<User>>(`${this.userUrl}/${id}`);
  // }

  // createUser() {

  // }

  updateSystemSettings(systemSettingVm: SystemSettingVm) {
    return this.http.patch<ResponseResult<void>>(`${this.systemSettingUrl}`, systemSettingVm);
  }
}