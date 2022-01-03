import { FileDetail } from 'app/shared/models/filedetail.model';

export class OrderVm {
  _method: any;
  id?: number;
  iwo: string;
  company: string;
  description: string;
  quantity: number;
  remark: string;
  status: string;
  person_in_charge: string;

  delivery_date: string;
  created_at: string;
  // file details
  files: FileDetail[];
  // file binary to be uploaded
  uploadFiles: File[];

  constructor() {
    this.status = 'in progress';
  }
}