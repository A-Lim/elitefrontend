import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'environments/environment';
import { WorkflowVm } from 'app/modules/workflows/models/workflow.model.vm';
import { Workflow, Process } from 'app/modules/workflows/models/workflow.model';
import { ResponseResult } from 'app/shared/models/responses/responseresult.model';
import { PaginationResponse } from 'app/shared/models/responses/pagination.response';
import { tap } from 'rxjs/operators';
import { ColumnSettingVm } from '../orders/models/columnsetting.model.vm';



@Injectable({ providedIn: 'root' })
export class WorkflowService {
  private workflowUrl = `${environment.apiUrl}/api/${environment.apiVersion}/workflows`;

  private sideMenuWorkflowsBS = new BehaviorSubject<Workflow[]>([]);
  public readonly sideMenuWorkflow$ = this.sideMenuWorkflowsBS.asObservable();
  

  constructor(private http: HttpClient) {
  }

  getWorkflowsForSideMenu() {
    return this.http.get<ResponseResult<Workflow[]>>(`${this.workflowUrl}/sidemenu`)
      .pipe(tap(response => this.sideMenuWorkflowsBS.next(response.data)));
  }

  isNameExists(name: string, workflowId?: number) {
    return this.http.post<ResponseResult<boolean>>(`${this.workflowUrl}/exists`, { name, workflowId });
  }

  getWorkflows(qParams: any) {
    return this.http.get<ResponseResult<PaginationResponse<Workflow>>>(this.workflowUrl, { params: qParams });
  }

  getWorkflow(id: number) {
    return this.http.get<ResponseResult<Workflow>>(`${this.workflowUrl}/${id}`);
  }

  getWorkflowProcesses(id: number) {
    return this.http.get<ResponseResult<Process[]>>(`${this.workflowUrl}/${id}/processes`); 
  }

  createWorkflow(workflowVm: WorkflowVm) {
    return this.http.post<ResponseResult<Workflow>>(`${this.workflowUrl}`, workflowVm)
      .pipe(tap(_ => this.getWorkflowsForSideMenu().subscribe()));
  }

  updateWorkflow(id: number, workflowVm: WorkflowVm) {
    return this.http.patch<ResponseResult<Workflow>>(`${this.workflowUrl}/${id}`, workflowVm)
      .pipe(tap(_ => this.getWorkflowsForSideMenu().subscribe()));;
  }

  updateColumnWidth(id: number, data: ColumnSettingVm) {
    return this.http.patch<ResponseResult<null>>(`${this.workflowUrl}/${id}/columnwidth`, data);
  }

  deleteWorkflow(id: number) {
    return this.http.delete<ResponseResult<void>>(`${this.workflowUrl}/${id}`)
      .pipe(tap(_ => this.getWorkflowsForSideMenu().subscribe()));;
  }

  activateWorkflow(id: number) {
    return this.http.patch<ResponseResult<void>>(`${this.workflowUrl}/${id}/activate`, null)
      .pipe(tap(_ => this.getWorkflowsForSideMenu().subscribe()));;
  }

  deactivateWorkflow(id: number) {
    return this.http.patch<ResponseResult<void>>(`${this.workflowUrl}/${id}/deactivate`, null)
      .pipe(tap(_ => this.getWorkflowsForSideMenu().subscribe()));;
  }
}