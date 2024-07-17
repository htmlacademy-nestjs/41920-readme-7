import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';
import { CreateTagDto, TagRdo, TagService } from '@project/tags';

@ApiTags('Tags')
@Controller('posts/:postId/tags')
export class TagsController {
  constructor(private readonly tagService: TagService) {}

  @Post('/')
  public async create(@Body() dto: CreateTagDto) {
    const tagEntity = await this.tagService.createTag(dto);

    return fillDto(TagRdo, tagEntity.toPOJO());
  }

  @Get('/')
  public async get(@Param('postId') postId: string) {
    const tags = await this.tagService.getTagsByPostId(postId);

    return fillDto(
      TagRdo,
      tags.map((like) => like.toPOJO()),
    );
  }

  @Delete('/:id')
  public async delete(@Param('postId') id: string) {
    await this.tagService.deleteTag(id);
  }
}
