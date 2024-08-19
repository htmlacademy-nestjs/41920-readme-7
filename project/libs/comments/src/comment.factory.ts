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

  public createFromDto(dto: CreateCommentDto, postId: string): CommentEntity {
    const currentDate = new Date();
    return new CommentEntity({
      ...dto,
      postId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }
}
