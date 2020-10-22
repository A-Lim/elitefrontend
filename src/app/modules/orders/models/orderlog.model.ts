import { Process } from 'app/modules/workflows/models/workflow.model';

export interface OrderLog {
  id: number;
  workflow_id: number;
  order_id: number;
  process_id: number;
  from_status: string;
  to_status: string;
  process: Process;
  user: UserDetail;
}

export interface UserDetail {
  name: string;
  email: string;
}