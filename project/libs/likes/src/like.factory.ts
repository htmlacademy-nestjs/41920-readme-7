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

  public createFromDto(dto: CreateLikeDto, postId: string): LikeEntity {
    const currentDate = new Date();
    return new LikeEntity({
      ...dto,
      postId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }
}
