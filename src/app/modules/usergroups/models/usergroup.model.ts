import { User } from 'app/modules/users/models/user.model';
import { Permission } from 'app/modules/usergroups/models/permission.model';

export interface UserGroup {
  id: number;
  name: string;
  code: string;
  status: string;
  is_admin: boolean;
  users?: User[];
  permissions?: Permission[];
}