import { User } from 'app/modules/users/models/user.model';
import { TokenData } from 'app/shared/models/responses/tokendata.model';

export interface LoginData extends TokenData {
  user: User;
  permissions: string[];
}