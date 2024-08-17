import { Module } from '@nestjs/common';

import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { CommentFactory } from './comment.factory';

@Module({
  providers: [CommentService, CommentRepository, CommentFactory],
  exports: [CommentService],
})
export class CommentModule {}
