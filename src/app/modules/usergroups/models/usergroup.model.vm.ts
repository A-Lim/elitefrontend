export class UserGroupVm {
  id: number;
  name: string;
  code: string;
  is_admin: boolean;
  status: string;
  permissions: number[]

  constructor() {
    this.name = '';
    this.code = '';
    this.is_admin = false;
    this.status = 'active';
    this.permissions = [];
  }
}