import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';
import { CreateTagDto, TagRdo, TagService } from '@project/tags';

@ApiTags('Tags')
@Controller('tag')
export class TagsController {
  constructor(private readonly tagService: TagService) {}

  @Get('/all')
  public async index() {
    const allTags = await this.tagService.getAllTags();

    return fillDto(
      TagRdo,
      allTags.map((tag) => tag.toPOJO()),
    );
  }

  @Post('/')
  public async create(@Body() dto: CreateTagDto) {
    const tagEntity = await this.tagService.createTag(dto);

    return fillDto(TagRdo, tagEntity.toPOJO());
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    await this.tagService.deleteTag(id);
  }
}
