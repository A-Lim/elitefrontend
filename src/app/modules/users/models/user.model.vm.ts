export class UserVm {
  name: string;
  status: string;
  usergroups: number[];

  constructor() {
    this.name = '';
    this.status = 'active';
    this.usergroups = [];
  }
}