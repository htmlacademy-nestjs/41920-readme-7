import { Injectable } from '@nestjs/common';

import { EntityFactory } from '@project/shared/core';
import { Comment } from '@project/types';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentFactory implements EntityFactory<CommentEntity> {
  public create(data: Comment): CommentEntity {
    return new CommentEntity(data);
  }

  public static createFromUserIdAndPostId(dto: CreateCommentDto): CommentEntity {
    const entity = new CommentEntity(dto);
    entity.postId = dto.postId;
    entity.userId = dto.userId;

    return entity;
  }
}
