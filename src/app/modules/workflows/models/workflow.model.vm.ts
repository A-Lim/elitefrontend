import { ProcessVm } from 'app/modules/workflows/models/process.model.vm';

export class WorkflowVm {
  id?: number;
  name: string;
  status: string;
  processes: ProcessVm[];

  constructor() {
    this.name = '';
    this.processes = [];
  }
}