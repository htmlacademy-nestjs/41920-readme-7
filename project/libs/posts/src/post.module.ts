import { Module } from '@nestjs/common';

import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostFactory } from './post.factory';
import { CommentModule } from '@project/comments';
import { LikeModule } from '@project/likes';

@Module({
  imports: [CommentModule, LikeModule],
  providers: [PostService, PostRepository, PostFactory],
  exports: [PostService],
})
export class PostModule {}
