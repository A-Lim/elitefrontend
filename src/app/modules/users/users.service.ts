import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'app/modules/users/models/user.model';
import { UserVm } from 'app/modules/users/models/user.model.vm';
import { API_BASE_URL, API_VERSION } from 'app/configs/app.config';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';


@Injectable({ providedIn: 'root' })
export class UserService {
  private userUrl = `${API_BASE_URL}/api/${API_VERSION}/users`;

  constructor(private http: HttpClient) {
  }

  /****** Users ******/
  getUsers(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<User>>>(`${this.userUrl}`, { params: qParams });
  }

  getUser(id: number) {
    return this.http.get<ResponseResult<User>>(`${this.userUrl}/${id}`);
  }

  createUser() {

  }

  updateUser(id: number, userVm: UserVm) {
    return this.http.patch<ResponseResult<User>>(`${this.userUrl}/${id}`, userVm);
  }

  resetUserPassword(id: number) {
    return this.http.post<ResponseResult<string>>(`${this.userUrl}/${id}/reset-password`, null);
  }
}