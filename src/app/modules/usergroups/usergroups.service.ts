import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserGroup } from 'app/modules/usergroups/models/usergroup.model';
import { API_BASE_URL, API_VERSION } from 'app/configs/app.config';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { PermissionModule } from 'app/modules/usergroups/models/permissionmodule.model';
import { UserGroupVm } from './models/usergroup.model.vm';
import { map, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class UserGroupService {
  private userGroupUrl = `${API_BASE_URL}/api/${API_VERSION}/usergroups`;
  private permissionUrl = `${API_BASE_URL}/api/${API_VERSION}/permissions`;

  constructor(private http: HttpClient) {
  }

  checkCodeExists(code: string, userGroupId?: number) {
    return this.http.post<ResponseResult<boolean>>(`${this.userGroupUrl}/exists`, { code, userGroupId });
  }

  getPermissions() {
    return this.http.get<ResponseResult<PermissionModule[]>>(this.permissionUrl);
  }

  getUserGroups(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<UserGroup>>>(this.userGroupUrl, { params: qParams });
  }

  getUserGroup(id: number) {
    return this.http.get<ResponseResult<UserGroup>>(`${this.userGroupUrl}/${id}`);
  }

  createUserGroup(userGroupVm: UserGroupVm) {
    return this.http.post<ResponseResult<UserGroup>>(`${this.userGroupUrl}`, userGroupVm);
  }

  updateUserGroup(id: number, userGroupVm: UserGroupVm) {
    return this.http.patch<ResponseResult<UserGroup>>(`${this.userGroupUrl}/${id}`, userGroupVm);
  }

  deleteUserGroup(id: number) {
    return this.http.delete<ResponseResult<null>>(`${this.userGroupUrl}/${id}`);
  }
}