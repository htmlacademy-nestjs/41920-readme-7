import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';
import { LikeRdo, LikeService } from '@project/likes';

@ApiTags('Likes')
@Controller('posts/:postId/likes')
export class LikesController {
  constructor(private readonly likeService: LikeService) {}

  @Get('/')
  public async get(@Param('postId') postId: string) {
    const likes = await this.likeService.getLikesByPostId(postId);

    return fillDto(
      LikeRdo,
      likes.map((like) => like.toPOJO()),
    );
  }
}
