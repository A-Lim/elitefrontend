import { UserGroup } from 'app/modules/usergroups/models/usergroup.model';

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string[];
    email_verified_at: string;
    status: string;
    usergroups: UserGroup[];
}