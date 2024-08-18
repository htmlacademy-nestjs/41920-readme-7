import { Module } from '@nestjs/common';
import { PostModule } from '@project/posts';
import { LikeModule } from '@project/likes';
import { LikesController } from './likes.controller';
import { PrismaClientModule } from '@project/shared/models';
import { CommentModule } from '@project/comments';
import { PostsController } from './posts.controller';
import { CommentsController } from './comment.controller';

@Module({
  imports: [PostModule, LikeModule, PrismaClientModule, CommentModule],
  controllers: [PostsController, LikesController, CommentsController],
})
export class AppModule {}
