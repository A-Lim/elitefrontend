import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import cloneDeep from 'lodash-es/cloneDeep';

import { Base } from 'app/shared/components/base.component';
import { WorkflowVm } from 'app/modules/workflows/models/workflow.model.vm';
import { ProcessVm } from 'app/modules/workflows/models/process.model.vm';
import { WorkflowService } from 'app/modules/workflows/workflows.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'workflows-create',
  templateUrl: './workflows-create.component.html',
  styleUrls: ['./workflows-create.component.css']
})
export class WorkflowsCreateComponent extends Base implements OnInit, OnDestroy {

  @ViewChild('processForm')
  processForm: NgForm;

  @ViewChild('workflowForm')
  workflowForm: NgForm;

  workflowVm: WorkflowVm;
  wFormSubmitted: boolean;
  processVm: ProcessVm;
  pFormSubmitted: boolean;

  constructor(private workflowSvc: WorkflowService) { 
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitle('Create Workflow');

    this.workflowVm = new WorkflowVm();
    this.workflowVm.status = 'active';
    this.processVm = <ProcessVm> {
      statuses: ['Pending', 'Done', 'Urgent', 'None'],
      default: 'None',
    };
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit() {
    this.wFormSubmitted = true;

    if (!this.workflowForm.valid)
      return;

    if (this.workflowVm.processes.length === 0) {
      this.swalAlert('Error', 'There must be at least one process to create a workflow.', 'warning')
        .subscribe();
      return;
    }

    this.isLoading = true;
    this.workflowSvc.createWorkflow(this.workflowVm)
      .pipe(switchMap(response => this.swalAlert('Success', response.message, 'success')))
      .subscribe(_ => {
          this.isLoading = false;
          this.router.navigate(['admin/workflows']);
        },
        _ => this.isLoading = false
      );
  }

  drop(event: CdkDragDrop<ProcessVm[]>) {
    moveItemInArray(this.workflowVm.processes, event.previousIndex, event.currentIndex);
    this.updateSeq();
  }

  addProcess() {
    this.pFormSubmitted = true;

    if (!this.processForm.valid)
      return;

    const newProcessVm: ProcessVm = cloneDeep(this.processVm);
    newProcessVm.seq = this.workflowVm.processes.length + 1;
    newProcessVm.width = 55;
    newProcessVm.pinned = '0';
    this.workflowVm.processes.push(newProcessVm);
    
    this.processVm.name = '';
    this.pFormSubmitted = false;
    this.processForm.form.markAsPristine();
  }

  addWorkflowStatus(pIndex: number) {
    this.workflowVm.processes[pIndex].statuses.push('');
  }

  removeWorkflowProcess(index: number) {
    this.workflowVm.processes.splice(index, 1);
  }

  removeWorkflowStatus(pIndex: number, sIndex: number) {
    this.workflowVm.processes[pIndex].statuses.splice(sIndex, 1);
  }

  addStatus() {
    this.processVm.statuses.push('');
  }

  removeStatus(index: number) {
    this.processVm.statuses.splice(index, 1);
  }

  trackByWorkflow(index: number) {
    return index;
  }

  trackByStatus(index: number) {
    return index;
  }

  trackByPStatus(index: number) {
    return index;
  }

  private updateSeq() {
    this.workflowVm.processes.forEach((x, index) => x.seq = index + 1);
  }
}
