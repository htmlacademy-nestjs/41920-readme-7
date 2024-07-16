import { Expose } from 'class-transformer';

import { PostStatus, PostType } from '@project/shared/core';
import { TagRdo } from '@project/tags';
import { LikeRdo } from '@project/likes';

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
  type: PostType = PostType.Text;

  @Expose()
  status: PostStatus = PostStatus.Draft;

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
  tags: TagRdo[] = [];

  @Expose()
  likes: LikeRdo[];
  /*
  @Expose()
  comments: CommentRdo[];


 */
}
