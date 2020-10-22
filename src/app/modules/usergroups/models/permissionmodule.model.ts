import { Permission } from './permission.model';

export interface PermissionModule {
  id: number;
  code: string;
  name: string;
  description: string;
  is_active: boolean;
  permissions: Permission[];
}