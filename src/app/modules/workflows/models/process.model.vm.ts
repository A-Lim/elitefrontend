export class ProcessVm {
  id?: number;
  name: string;
  statuses: string[];
  default: string;
  seq: number;
  width: number;
  pinned: string;
  is_published: boolean;

  constructor() {
    this.statuses = [];
    this.is_published = false;
  }
}