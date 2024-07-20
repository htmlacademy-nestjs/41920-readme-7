import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared/core';

import { TagEntity } from './tag.entity';
import { Tag } from '@project/types';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagFactory implements EntityFactory<TagEntity> {
  public create(data: Tag): TagEntity {
    return new TagEntity(data);
  }

  public static createFromTitle(dto: CreateTagDto): TagEntity {
    const entity = new TagEntity(dto);
    entity.title = dto.title;
    entity.postId = dto.postId;

    return entity;
  }
}
