import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { Order } from 'app/modules/orders/models/order.model';
import { OrderVm } from 'app/modules/orders/models/order.model.vm';
import { Workflow } from 'app/modules/workflows/models/workflow.model';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orderUrl = `${environment.apiUrl}/api/${environment.apiVersion}/workflows`;

  constructor(private http: HttpClient) {
  }

  createOrder(workflowId: number, orderVm: OrderVm) {
    var formData = new FormData();
    this.appendFormData(formData, orderVm, '');
    return this.http.post<ResponseResult<Workflow>>(`${this.orderUrl}/${workflowId}/orders`, formData);
  }

  isIWOExists(workflowId: number, iwo: string, orderId: number) {
    return this.http.post<ResponseResult<boolean>>(`${this.orderUrl}/${workflowId}/orders/exists`, { workflowId, iwo, orderId });
  }

  getOrders(workflowId: number, qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<Order[]>>>(`${this.orderUrl}/${workflowId}/orders`, { params: qParams });
  }

  getOrder(workflowId: number, orderId: number) {
    return this.http.get<ResponseResult<Order>>(`${this.orderUrl}/${workflowId}/orders/${orderId}`);
  }

  updateOrder(workflowId: number, orderId: number, orderVm: OrderVm) {
    orderVm._method = 'PATCH';
    var formData = new FormData();
    this.appendFormData(formData, orderVm, '');
    return this.http.post<ResponseResult<Order>>(`${this.orderUrl}/${workflowId}/orders/${orderId}`, formData);
  }

  updateOrderProcess(workflowId: number, orderId: number, data: any) {
    return this.http.patch<ResponseResult<void>>(`${this.orderUrl}/${workflowId}/orders/${orderId}/updateprocess`, data);
  }

  deleteOrder(workflowId: number, orderId: number) {
    return this.http.delete<ResponseResult<void>>(`${this.orderUrl}/${workflowId}/orders/${orderId}`);
  }


  private appendFormData(formData, data, rootName) {
    let root = rootName || '';
    if (data instanceof File) {
        formData.append(root, data);
    } else if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
            this.appendFormData(formData, data[i], root + '[' + i + ']');
        }
    } else if (typeof data === 'object' && data) {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (root === '') {
                    this.appendFormData(formData, data[key], key);
                } else {
                    this.appendFormData(formData, data[key], root + '[' + key + ']');
                }
            }
        }
    } else {
        if (data !== null && typeof data !== 'undefined') {
            formData.append(root, data);
        }
    }
  }
}