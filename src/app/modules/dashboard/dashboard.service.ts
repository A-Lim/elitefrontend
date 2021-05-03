import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { GeneralStat } from 'app/modules/dashboard/models/generalstat.model';
import { OverdueSoonOrder } from 'app/modules/dashboard/models/overduesoonorders.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private dashboardUrl = `${environment.apiUrl}/api/${environment.apiVersion}/dashboard`;

  constructor(private http: HttpClient) {
  }

  getStats() {
    return this.http.get<ResponseResult<GeneralStat>>(`${this.dashboardUrl}/stats`);
  }

  getOverdueSoonOrders(range: string) {
    return this.http.get<ResponseResult<OverdueSoonOrder[]>>(`${this.dashboardUrl}/overduesoon?range=${range}`);
  }

  // getNewUsersStats(params: any) {
  //   return this.http.get<ResponseResult<NewUserStat[]>>(`${this.dashboardUrl}/newusers`, { params });
  // }

  // getTopMerchantVisits() {
  //   return this.http.get<ResponseResult<MerchantVisitStat[]>>(`${this.dashboardUrl}/top10merchantvisits`);
  // }
}