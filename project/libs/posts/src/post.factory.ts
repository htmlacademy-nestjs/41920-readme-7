import { Injectable } from '@nestjs/common';

import { PostEntity } from './post.entity';
import { EntityFactory, Post } from '@project/shared/core';
import { CreatePostDto } from './dto/create-post.dto';
import { TagEntity } from '@project/tags';
import { Tag } from '@project/types';

@Injectable()
export class PostFactory implements EntityFactory<PostEntity> {
  public create(data: Post): PostEntity {
    return new PostEntity(data);
  }

  public static createFromCreatePostDto(
    dto: CreatePostDto,
    tags: TagEntity[],
  ): PostEntity {
    const entity = new PostEntity();
    entity.userId = dto.userId;
    entity.type = dto.type;
    entity.title = dto.title;
    entity.videoLink = dto.videoLink;
    entity.announce = dto.announce;
    entity.postText = dto.postText;
    entity.link = dto.link;
    entity.description = dto.description;
    entity.photoLink = dto.photoLink;
    entity.quoteText = dto.quoteText;
    entity.quoteAuthor = dto.quoteAuthor;
    //   entity.comments = [];
    //  entity.likes = [];
    entity.tags = tags;

    return entity;
  }
}
