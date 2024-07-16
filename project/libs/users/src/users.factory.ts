import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared/core';

import { UsersEntity } from './users.entity';
import { AuthUser } from '@project/types';

@Injectable()
export class UsersFactory implements EntityFactory<UsersEntity> {
  public create(data: AuthUser): UsersEntity {
    return new UsersEntity(data);
  }
}
