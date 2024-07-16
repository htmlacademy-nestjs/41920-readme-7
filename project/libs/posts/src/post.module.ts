import { Module } from '@nestjs/common';

import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostFactory } from './post.factory';
import { TagModule } from '@project/tags';

@Module({
  imports: [TagModule],
  providers: [PostService, PostRepository, PostFactory],
  exports: [PostService],
})
export class PostModule {}
