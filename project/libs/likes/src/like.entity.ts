import { Entity, StorableEntity } from '@project/shared/core';
import { Like } from '@project/types';

export class LikeEntity extends Entity implements StorableEntity<Like> {
  public postId: string = '';
  public userId: string = '';
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();

  constructor(data: Like) {
    super();
    if (!data.postId || !data.userId) {
      throw new Error('no postId or userId');
    }

    this.populate(data);
  }

  public populate(data: Like) {
    this.id = data.id ?? '';
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.postId = data.postId;
    this.userId = data.userId;

    return this;
  }

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      userId: this.userId,
    };
  }
}
