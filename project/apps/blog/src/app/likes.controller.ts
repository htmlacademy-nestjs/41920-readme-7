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
import { LikeRdo, LikeService } from '@project/likes';
import { PostService } from '@project/posts';
import { CreateLikeDto } from '../../../../libs/likes/src/dto/create-like.dto';

@ApiTags('Likes')
@Controller('posts/:postId/likes')
export class LikesController {
  constructor(
    private readonly likeService: LikeService,
    private readonly postService: PostService,
  ) {}

  @Get('/')
  public async get(@Param('postId') postId: string) {
    const likes = await this.likeService.getLikesByPostId(postId);

    return fillDto(
      LikeRdo,
      likes.map((like) => like.toPOJO()),
    );
  }

  @Post('/')
  public async create(@Body() dto: CreateLikeDto) {
    const postEntity = await this.postService.getPost(dto.postId);
    if (!postEntity) {
      throw new NotFoundException(`Post with id «${dto.postId}» not found`);
    }
    const likeEntity = await this.likeService.createLike(dto);

    return fillDto(LikeRdo, likeEntity.toPOJO());
  }

  @Delete('/')
  public async delete(@Param('postId') postId: string, @Query('userId') userId: string) {
    const postEntity = await this.postService.getPost(postId);
    if (!postEntity) {
      throw new NotFoundException(`Post with id «${postId}» not found`);
    }

    await this.likeService.deleteLike(postId, userId);
  }
}
