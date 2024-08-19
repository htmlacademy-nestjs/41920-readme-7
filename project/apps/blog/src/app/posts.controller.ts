import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Query,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';
import {
  CreatePostDto,
  PostQuery,
  PostRdo,
  PostService,
  PostWithPaginationRdo,
  UpdatePostDto,
} from '@project/posts';
import { CreateCommentDto } from '@project/comments';
import { CommentRdo } from '@project/comments';
import { CreateLikeDto } from '../../../../libs/likes/src/dto/create-like.dto';
import { LikeRdo } from '@project/likes';

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
  public async index(@Query() query: PostQuery) {
    const postsWithPagination = await this.postService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    };
    return fillDto(PostWithPaginationRdo, result);
  }

  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.createPost(dto);
    return fillDto(PostRdo, newPost.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.postService.updatePost(id, dto);
    return fillDto(PostRdo, updatedPost.toPOJO());
  }

  @Post('/:postId/comments')
  public async createComment(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
  ) {
    const newComment = await this.postService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }

  @Post('/:postId/likes')
  public async createLike(@Param('postId') postId: string, @Body() dto: CreateLikeDto) {
    const newLike = await this.postService.addLike(postId, dto);
    return fillDto(LikeRdo, newLike.toPOJO());
  }
}
