import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/shared/data-access';

import { PostFactory } from './post.factory';
import { PostEntity } from './post.entity';

@Injectable()
export class PostRepository extends BaseMemoryRepository<PostEntity> {
  constructor(entityFactory: PostFactory) {
    super(entityFactory);
  }
}
