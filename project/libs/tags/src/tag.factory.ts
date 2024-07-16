import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared/core';

import { TagEntity } from './tag.entity';
import { Tag } from '@project/types';

@Injectable()
export class TagFactory implements EntityFactory<TagEntity> {
  public create(data: Tag): TagEntity {
    return new TagEntity(data);
  }
}
