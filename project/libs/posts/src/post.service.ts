import { Injectable, NotFoundException } from '@nestjs/common';

import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';
import { PostQuery } from './post.query';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostFactory } from './post.factory';
import { LikeRepository } from '../../likes/src/like.repository';
import { LikeFactory } from '../../likes/src/like.factory';
import {
  CommentEntity,
  CommentFactory,
  CommentRepository,
  CreateCommentDto,
} from '@project/comments';
import { PaginationResult } from '@project/shared/core';
import { LikeEntity } from '@project/likes';
import { CreateLikeDto } from '../../likes/src/dto/create-like.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
    private readonly commentFactory: CommentFactory,
    private readonly likeRepository: LikeRepository,
    private readonly likeFactory: LikeFactory,
  ) {}

  public async getAllPosts(query?: PostQuery): Promise<PaginationResult<PostEntity>> {
    return this.postRepository.find(query);
  }

  public async createPost(dto: CreatePostDto): Promise<PostEntity> {
    const newPost = PostFactory.createFromCreatePostDto(dto);
    await this.postRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.postRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string): Promise<PostEntity> {
    return this.postRepository.findById(id);
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<PostEntity> {
    const existsPost = await this.postRepository.findById(id);

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsPost[key] !== value) {
        existsPost[key] = value;
      }
    }

    await this.postRepository.update(existsPost);

    return existsPost;
  }

  public async addComment(postId: string, dto: CreateCommentDto): Promise<CommentEntity> {
    const existsPost = await this.getPost(postId);
    const newComment = this.commentFactory.createFromDto(dto, existsPost.id);
    await this.commentRepository.save(newComment);

    return newComment;
  }

  public async addLike(postId: string, dto: CreateLikeDto): Promise<LikeEntity> {
    const existsPost = await this.getPost(postId);
    const newLike = this.likeFactory.createFromDto(dto, existsPost.id);
    await this.likeRepository.save(newLike);

    return newLike;
  }
}
