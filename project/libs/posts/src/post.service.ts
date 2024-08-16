import { Injectable, NotFoundException } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { PostFactory } from './post.factory';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async getAllPosts(): Promise<PostEntity[]> {
    return this.postRepository.findAll();
  }

  public async createPost(dto: CreatePostDto) {
    const newPost = PostFactory.createFromCreatePostDto(dto);
    await this.postRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string) {
    try {
      await this.postRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string) {
    return this.postRepository.findById(id);
  }

  public async updatePost(id: string, dto: UpdatePostDto) {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with id «${id}» not found`);
    }

    post.title = dto.title;
    post.announce = dto.announce;
    post.description = dto.description;
    post.link = dto.link;
    post.description = dto.description;
    post.videoLink = dto.videoLink;
    post.postText = dto.postText;
    post.status = dto.status;
    post.photoLink = dto.photoLink;
    post.quoteText = dto.quoteText;
    post.quoteAuthor = dto.quoteAuthor;
    post.type = dto.type;

    await this.postRepository.update(post);

    return post;
  }
}
