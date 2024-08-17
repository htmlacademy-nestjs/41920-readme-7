import { ConflictException, Injectable } from '@nestjs/common';

import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentFactory } from './comment.factory';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async getCommentsByPostId(postId: string): Promise<CommentEntity[]> {
    return this.commentRepository.findByPostId(postId);
  }

  public async createComment(dto: CreateCommentDto): Promise<CommentEntity> {
    const comments = await this.commentRepository.findByPostAndUserId(
      dto.postId,
      dto.userId,
    );
    if (comments) {
      throw new ConflictException('already commentd post');
    }

    const commentEntity = CommentFactory.createFromUserIdAndPostId(dto);
    await this.commentRepository.save(commentEntity);

    return commentEntity;
  }

  public async deleteComment(postId: string, userId: string) {
    const commentEntity = await this.commentRepository.findByPostAndUserId(
      postId,
      userId,
    );
    if (!commentEntity) {
      throw new ConflictException('comments does not exist');
    }
    await this.commentRepository.deleteById(commentEntity.id);
  }
}
