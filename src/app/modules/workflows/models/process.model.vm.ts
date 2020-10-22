export class ProcessVm {
  id?: number;
  name: string;
  statuses: string[];
  default: string;
  seq: number;
  is_published: boolean;

  constructor() {
    this.statuses = [];
    this.is_published = false;
  }
}