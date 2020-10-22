export interface Workflow {
  id: number;
  name: string;
  status: string;
  processes: Process[];
}

export interface Process {
  id: number;
  name: string;
  code: string;
  statuses: string[];
  default: string;
  seq: number;
}