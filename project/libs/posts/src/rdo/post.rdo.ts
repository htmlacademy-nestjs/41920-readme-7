import { Expose } from 'class-transformer';

import { PostStatus, PostType } from '@project/shared/core';
import { LikeRdo } from '@project/likes';
import { CommentRdo } from '@project/comments';

export class PostRdo {
  @Expose()
  id?: string;

  @Expose()
  userId: string = '';

  @Expose()
  originalUserId?: string;

  @Expose()
  originalPostId?: string;

  @Expose()
  type: PostType = PostType.TEXT;

  @Expose()
  status: PostStatus = PostStatus.DRAFT;

  @Expose()
  isReposted?: boolean;

  @Expose()
  title?: string;

  @Expose()
  link?: string;

  @Expose()
  description?: string;

  @Expose()
  photoLink?: string;

  @Expose()
  quoteText?: string;

  @Expose()
  quoteAuthor?: string;

  @Expose()
  announce?: string;

  @Expose()
  postText?: string;

  @Expose()
  videoLink?: string;

  @Expose()
  tags: string[] = [];

  @Expose()
  comments: CommentRdo[] = [];

  @Expose()
  likes: LikeRdo[] = [];
}
