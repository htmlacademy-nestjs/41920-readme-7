import { Comment, Entity, StorableEntity } from '@project/shared/core';

export class CommentEntity extends Entity implements StorableEntity<Comment> {
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();
  public postId: string = '';
  public message: string = '';
  public userId: string = '';

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment): void {
    if (!comment) {
      return;
    }

    this.id = comment.id ?? '';
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.message = comment.message;
    this.postId = comment.postId;
    this.userId = comment.userId;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      message: this.message,
      postId: this.postId,
      userId: this.userId,
    };
  }
}
