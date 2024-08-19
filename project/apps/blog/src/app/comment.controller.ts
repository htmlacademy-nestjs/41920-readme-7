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
import { CommentService } from '@project/comments';
import { CommentRdo } from '@project/comments';

@ApiTags('Comments')
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/')
  public async get(@Param('postId') postId: string) {
    const comments = await this.commentService.getCommentsByPostId(postId);

    return fillDto(
      CommentRdo,
      comments.map((comment) => comment.toPOJO()),
    );
  }
}
