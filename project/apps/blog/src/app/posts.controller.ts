import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';
import { CreatePostDto, PostRdo, PostService, UpdatePostDto } from '@project/posts';
import { TagService } from '@project/tags';

@ApiTags('Posts')
@Controller('post')
export class PostsController {
  constructor(
    private readonly postService: PostService,
    private readonly tagService: TagService,
  ) {}

  @Get('/all')
  public async getAll() {
    const postEntities = await this.postService.getAllPosts();
    return fillDto(
      PostRdo,
      postEntities.map((post) => post.toPOJO()),
    );
  }

  @Get('/:postId')
  public async getById(@Param('postId') postId: string) {
    const postEntity = await this.postService.getPost(postId);

    return fillDto(PostRdo, postEntity.toPOJO());
  }

  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const tagEntities = await this.tagService.getTagsByIds(dto.tags);
    const postEntity = await this.postService.createPost(dto, tagEntities);

    return fillDto(PostRdo, postEntity.toPOJO());
  }

  @Patch('/:postId')
  public async update(@Param('postId') postId: string, @Body() dto: UpdatePostDto) {
    const tagEntities = await this.tagService.getTagsByIds(dto.tags);
    const postEntity = await this.postService.updatePost(postId, dto, tagEntities);

    return fillDto(PostRdo, postEntity.toPOJO());
  }

  @Delete('/:postId')
  public async delete(@Param('postId') postId: string) {
    await this.postService.deletePost(postId);
  }
}
