import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/shared/data-access';

import { UsersEntity } from './users.entity';
import { UsersFactory } from './users.factory';

@Injectable()
export class UsersRepository extends BaseMemoryRepository<UsersEntity> {
  constructor(entityFactory: UsersFactory) {
    super(entityFactory);
  }

  public async findByEmail(email: string) {
    const entities = Array.from(this.entities.values());
    const user = entities.find((entity) => entity.email === email);

    if (!user) {
      return null;
    }

    return this.entityFactory.create(user);
  }
}
