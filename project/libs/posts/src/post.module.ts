import { Module } from '@nestjs/common';

import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostFactory } from './post.factory';

@Module({
  imports: [],
  providers: [PostService, PostRepository, PostFactory],
  exports: [PostService],
})
export class PostModule {}
