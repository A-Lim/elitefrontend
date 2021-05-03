import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { User } from 'app/modules/users/models/user.model';
import { UserGroup } from 'app/modules/usergroups/models/usergroup.model';
import { UserGroupVm } from './models/usergroup.model.vm';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { PermissionModule } from 'app/modules/usergroups/models/permissionmodule.model';

@Injectable({ providedIn: 'root' })
export class UserGroupService {
  private userGroupUrl = `${environment.apiUrl}/api/${environment.apiVersion}/usergroups`;
  private permissionUrl = `${environment.apiUrl}/api/${environment.apiVersion}/permissions`;

  constructor(private http: HttpClient) {
  }

  addUsers(id: number, userIds: number[]) {
    const data = { userIds: userIds };
    return this.http.post<ResponseResult<null>>(`${this.userGroupUrl}/${id}/users`, data);
  }

  checkCodeExists(code: string, userGroupId?: number) {
    return this.http.post<ResponseResult<boolean>>(`${this.userGroupUrl}/exists`, { code, userGroupId });
  }

  getPermissions() {
    return this.http.get<ResponseResult<PermissionModule[]>>(this.permissionUrl);
  }

  getUsers(id: number, qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<User>>>(`${this.userGroupUrl}/${id}/users`, { params: qParams });
  }

  // list users that are not inside usergroup
  getNotUsers(id: number, qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<User>>>(`${this.userGroupUrl}/${id}/notusers`, { params: qParams });
  }

  removeUser(id: number, userId: number) {
    return this.http.delete<ResponseResult<null>>(`${this.userGroupUrl}/${id}/users/${userId}`);
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