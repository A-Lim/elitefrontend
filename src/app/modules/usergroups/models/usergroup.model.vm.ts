export class UserGroupVm {
  name: string;
  code: string;
  is_admin: boolean;
  status: string;
  userIds: number[];
  permissions: string[]

  constructor() {
    this.name = '';
    this.code = '';
    this.is_admin = false;
    this.status = 'active';
    this.permissions = [];
  }
}