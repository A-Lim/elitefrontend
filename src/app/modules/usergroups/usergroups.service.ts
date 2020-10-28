import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { UserGroup } from 'app/modules/usergroups/models/usergroup.model';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { PermissionModule } from 'app/modules/usergroups/models/permissionmodule.model';
import { UserGroupVm } from './models/usergroup.model.vm';

@Injectable({ providedIn: 'root' })
export class UserGroupService {
  private userGroupUrl = `${environment.apiUrl}/api/${environment.apiVersion}/usergroups`;
  private permissionUrl = `${environment.apiUrl}/api/${environment.apiVersion}/permissions`;

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