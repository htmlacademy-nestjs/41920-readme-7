import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';
import { CreatePostDto, PostRdo, PostService, UpdatePostDto } from '@project/posts';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Get('/:postId')
  public async getById(@Param('postId') postId: string) {
    const postEntity = await this.postService.getPost(postId);

    return fillDto(PostRdo, postEntity.toPOJO());
  }

  @Get('/')
  public async getAll() {
    const postEntities = await this.postService.getAllPosts();
    return fillDto(
      PostRdo,
      postEntities.map((post) => post.toPOJO()),
    );
  }

  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const postEntity = await this.postService.createPost(dto);

    return fillDto(PostRdo, postEntity.toPOJO());
  }

  @Put('/:postId')
  public async update(@Param('postId') postId: string, @Body() dto: UpdatePostDto) {
    const postEntity = await this.postService.updatePost(postId, dto);

    return fillDto(PostRdo, postEntity.toPOJO());
  }

  @Delete('/:postId')
  public async delete(@Param('postId') postId: string) {
    await this.postService.deletePost(postId);
  }
}
