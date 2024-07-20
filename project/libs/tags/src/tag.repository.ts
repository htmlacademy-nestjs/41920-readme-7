import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/shared/data-access';

import { TagFactory } from './tag.factory';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagRepository extends BaseMemoryRepository<TagEntity> {
  constructor(entityFactory: TagFactory) {
    super(entityFactory);
  }

  public async findByPostId(postId: string) {
    const entities = Array.from(this.entities.values());
    const tags = entities.filter((entity) => entity.postId === postId);
    return tags.map(this.entityFactory.create);
  }

  public async findByTitle(title: string) {
    const entities = Array.from(this.entities.values());
    const tag = entities.find((entity) => entity.title === title);

    if (!tag) {
      return null;
    }

    return this.entityFactory.create(tag);
  }
}
