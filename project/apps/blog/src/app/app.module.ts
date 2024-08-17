import { Module } from '@nestjs/common';
import { TagModule } from '@project/tags';
import { PostModule } from '@project/posts';
import { LikeModule } from '@project/likes';
import { LikesController } from './likes.controller';
import { TagsController } from './tags.controller';
import { PrismaClientModule } from '@project/shared/models';
import { CommentModule } from '@project/comments';
import { CommentController } from './comment.controller';
import { PostsController } from './posts.controller';

@Module({
  imports: [TagModule, PostModule, LikeModule, PrismaClientModule, CommentModule],
  controllers: [PostsController, LikesController, TagsController, CommentController],
})
export class AppModule {}
