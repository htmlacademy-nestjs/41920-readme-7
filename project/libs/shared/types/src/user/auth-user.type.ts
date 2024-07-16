import { User } from './user.type';

export type AuthUser = User & {
  passwordHash: string;
};
