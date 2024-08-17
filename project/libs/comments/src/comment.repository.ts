import { Injectable } from '@nestjs/common';

import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';
import { Comment } from '@project/types';
import { BasePostgresRepository } from '../../shared/data-access/src/repository/base-postgres.repository';
import { PrismaClientService } from '@project/shared/models';

@Injectable()
export class CommentRepository extends BasePostgresRepository<CommentEntity, Comment> {
  constructor(
    entityFactory: CommentFactory,
    override readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public override async save(entity: CommentEntity) {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }

  public async findByPostId(postId: string) {
    const documents = await this.client.comment.findMany({
      where: {
        postId,
      },
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async findByPostAndUserId(postId: string, userId: string) {
    const document = await this.client.comment.findFirst({
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
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }
}
