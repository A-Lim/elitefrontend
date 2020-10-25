import { FileDetail } from 'app/shared/models/filedetail.model';

export class OrderVm {
  _method: any;
  id?: number;
  iwo: string;
  customer: string;
  remark: string;
  status: string;
  delivery_date: string;
  // file details
  files: FileDetail[];
  // file binary to be uploaded
  uploadFiles: File[];

  constructor() {
    this.status = 'in progress';
  }
}