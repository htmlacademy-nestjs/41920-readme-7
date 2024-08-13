import { Injectable, NotFoundException } from '@nestjs/common';

import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';
import { PrismaClientService } from '@project/shared/models';
import { Post } from '@prisma/client';
import { PostStatus, PostType } from '@project/types';
import { BasePostgresRepository } from '../../shared/data-access/src/repository/base-postgres.repository';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post> {
  constructor(entityFactory: PostFactory, override readonly client: PrismaClientService) {
    super(entityFactory, client);
  }

  public override async findAll(): Promise<PostEntity[]> {
    const posts = await this.client.post.findMany();

    if (!posts || !posts?.length) {
      throw new NotFoundException(`Posts not found.`);
    }

    return posts.map((post) => this.createEntityFromDocument(post));
  }

  public override async save(entity: PostEntity) {
    const record = await this.client.post.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }

  public override async findById(id: string): Promise<PostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument({
      ...document,
      type: document.type as PostType,
      status: document.status as PostStatus,
    });
  }
}
