import { ConflictException, Injectable } from '@nestjs/common';

import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async getCommentsByPostId(postId: string): Promise<CommentEntity[]> {
    return this.commentRepository.findByPostId(postId);
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
