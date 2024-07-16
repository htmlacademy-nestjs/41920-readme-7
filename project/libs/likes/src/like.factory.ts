import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared/core';
import { Like } from '@project/types';
import { LikeEntity } from './like.entity';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeFactory implements EntityFactory<LikeEntity> {
  public create(data: Like): LikeEntity {
    return new LikeEntity(data);
  }

  public static createFromUserIdAndPostId(dto: CreateLikeDto): LikeEntity {
    const entity = new LikeEntity(dto);
    entity.postId = dto.postId;
    entity.userId = dto.userId;

    return entity;
  }
}
