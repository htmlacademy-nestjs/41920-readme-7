import { Module } from '@nestjs/common';
import { TagModule } from '@project/tags';
import { PostModule } from '@project/posts';
import { PostsController } from './posts.controller';
import { TagsController } from './tags.controller';
import { LikeModule } from '@project/likes';
import { LikesController } from './likes.controller';

@Module({
  imports: [TagModule, PostModule, LikeModule],
  controllers: [PostsController, TagsController, LikesController],
})
export class AppModule {}
