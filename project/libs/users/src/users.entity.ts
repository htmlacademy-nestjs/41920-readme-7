import { compare, genSalt, hash } from 'bcrypt';

import { Entity } from '@project/shared/core';
import { StorableEntity } from '@project/shared/core';
import { AuthUser } from '@project/types';
import { SALT_ROUNDS } from './user.constant';

export class UsersEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string = '';
  public login: string = '';
  public passwordHash: string = '';

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.login = user.login;
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      login: this.login,
      passwordHash: this.passwordHash,
    };
  }

  public async setPassword(password: string): Promise<UsersEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
