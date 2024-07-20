import { Module } from '@nestjs/common';
import { TagModule } from '@project/tags';
import { PostModule } from '@project/posts';
import { PostsController } from './posts.controller';
import { LikeModule } from '@project/likes';
import { LikesController } from './likes.controller';
import { TagsController } from './tags.controller';

@Module({
  imports: [TagModule, PostModule, LikeModule],
  controllers: [PostsController, LikesController, TagsController],
})
export class AppModule {}
