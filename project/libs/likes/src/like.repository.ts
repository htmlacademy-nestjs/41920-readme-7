import { Injectable } from '@nestjs/common';

import { LikeEntity } from './like.entity';
import { LikeFactory } from './like.factory';
import { Like } from '@project/types';
import { BasePostgresRepository } from '../../shared/data-access/src/repository/base-postgres.repository';
import { PrismaClientService } from '@project/shared/models';

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, Like> {
  constructor(entityFactory: LikeFactory, override readonly client: PrismaClientService) {
    super(entityFactory, client);
  }

  public override async save(entity: LikeEntity) {
    const record = await this.client.like.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }

  public async findByPostId(postId: string) {
    const documents = await this.client.like.findMany({
      where: {
        postId,
      },
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async findByPostAndUserId(postId: string, userId: string) {
    const document = await this.client.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(document);
  }

  public override async deleteById(id: string) {
    await this.client.like.delete({
      where: {
        id,
      },
    });
  }
}
