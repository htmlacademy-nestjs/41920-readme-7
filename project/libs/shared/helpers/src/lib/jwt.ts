import { TokenPayload } from '@project/shared/core';
import { User } from '@project/types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    login: user.login,
  };
}
