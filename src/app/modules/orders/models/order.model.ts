import { FileDetail } from 'app/shared/models/filedetail.model';
import { OrderLog } from 'app/modules/orders/models/orderlog.model';

export interface Order {
  id: number;
  iwo: string;
  customer: string;
  remark: string;
  status: string;
  files: FileDetail[];
  delivery_date: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;

  orderLogs: OrderLog[];
}
