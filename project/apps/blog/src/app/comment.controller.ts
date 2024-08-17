import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';
import { PostService } from '@project/posts';
import { CreateCommentDto } from '../../../../libs/comments/src/dto/create-comment.dto';
import { CommentService } from '../../../../libs/comments/src/comment.service';
import { CommentRdo } from '../../../../libs/comments/src/rdo/comment.rdo';

@ApiTags('Comments')
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService,
  ) {}

  @Get('/')
  public async get(@Param('postId') postId: string) {
    const comments = await this.commentService.getCommentsByPostId(postId);

    return fillDto(
      CommentRdo,
      comments.map((comment) => comment.toPOJO()),
    );
  }

  @Post('/')
  public async create(@Body() dto: CreateCommentDto) {
    console.log('hello');
    const postEntity = await this.postService.getPost(dto.postId);
    if (!postEntity) {
      throw new NotFoundException(`Post with id «${dto.postId}» not found`);
    }
    const commentEntity = await this.commentService.createComment(dto);

    return fillDto(CommentRdo, commentEntity.toPOJO());
  }

  @Delete('/')
  public async delete(@Param('postId') postId: string, @Query('userId') userId: string) {
    const postEntity = await this.postService.getPost(postId);
    if (!postEntity) {
      throw new NotFoundException(`Post with id «${postId}» not found`);
    }

    await this.commentService.deleteComment(postId, userId);
  }
}
