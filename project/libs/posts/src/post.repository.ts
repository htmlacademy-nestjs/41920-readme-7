import { Injectable, NotFoundException } from '@nestjs/common';
import { PostType, Prisma } from '@prisma/client';

import { PaginationResult, Post } from '@project/shared/core';

import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';
import { PostQuery } from './post.query';
import { BasePostgresRepository } from '../../shared/data-access/src/repository/base-postgres.repository';
import { PrismaClientService } from '@project/shared/models';
import { mapPostStatus, mapPostType } from './mappers';
import { DEFAULT_PAGE_COUNT, DEFAULT_POST_COUNT_LIMIT } from './post.constant';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post> {
  constructor(entityFactory: PostFactory, override readonly client: PrismaClientService) {
    super(entityFactory, client);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public override async save(entity: PostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    const { id, ...dataWithoutId } = pojoEntity;
    const record = await this.client.post.create({
      data: {
        ...dataWithoutId,
        likes: {
          connect: [],
        },
        comments: {
          connect: [],
        },
      },
    });

    entity.id = record.id;
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  public override async findById(id: string): Promise<PostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        likes: true,
        comments: true,
      },
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    // @ts-ignore
    return this.createEntityFromDocument(document);
  }

  public override async update(entity: PostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        title: pojoEntity.title,
        videoLink: pojoEntity.videoLink,
        postText: pojoEntity.postText,
        quoteText: pojoEntity.quoteText,
        quoteAuthor: pojoEntity.quoteAuthor,
        photoLink: pojoEntity.photoLink,
        link: pojoEntity.link,
        description: pojoEntity.description,
        type: mapPostType(pojoEntity.type),
        status: mapPostStatus(pojoEntity.status),
      },
      include: {
        likes: true,
        comments: true,
      },
    });
  }

  public async find(query?: PostQuery): Promise<PaginationResult<PostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    console.log(query?.page, query?.limit, skip);
    const take = Number(query?.limit);
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          likes: true,
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      // @ts-ignore
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page ?? DEFAULT_PAGE_COUNT,
      totalPages: this.calculatePostsPage(postCount, take ?? 50),
      itemsPerPage: take ?? DEFAULT_POST_COUNT_LIMIT,
      totalItems: postCount,
    };
  }
}
