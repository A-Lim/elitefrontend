import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'app/shared/shared.module';

import { WorkflowsRoutingModule } from 'app/modules/workflows/workflows.routing';
import { WorkflowsCreateComponent } from 'app/modules/workflows/workflows-create/workflows-create.component';
import { WorkflowsListComponent } from 'app/modules/workflows/workflows-list/workflows-list.component';
import { WorkflowsEditComponent } from 'app/modules/workflows/workflows-edit/workflows-edit.component';
import { WorkflowNameExistsValidator } from 'app/modules/workflows/validators/workflownameexists.validator';

@NgModule({
  declarations: [
    WorkflowsListComponent,
    WorkflowsCreateComponent,
    WorkflowsEditComponent,
    WorkflowNameExistsValidator
  ],
  imports: [
    WorkflowsRoutingModule,
    SharedModule,
    DragDropModule,
  ],
})
export class WorkflowsModule { }
