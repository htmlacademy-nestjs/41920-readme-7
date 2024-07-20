import { Entity, Post, PostStatus, PostType, StorableEntity } from '@project/shared/core';
import { TagEntity } from '@project/tags';
import { TagFactory } from '../../tags/src/tag.factory';
import { LikeEntity } from '@project/likes';
import { LikeFactory } from '../../likes/src/like.factory';

export class PostEntity extends Entity implements StorableEntity<Post> {
  title?: string;
  type: PostType = PostType.Text;
  userId: string = '';
  status: PostStatus = PostStatus.Draft;
  videoLink?: string;
  announce?: string;
  postText?: string;
  quoteText?: string;
  quoteAuthor?: string;
  photoLink?: string;
  link?: string;
  description?: string;
  originalAuthorId?: string;
  originalPostId?: string;
  isReposted!: boolean;
  tags: TagEntity[] = [];
  likes: LikeEntity[] = [];

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post) {
    if (!post) {
      return;
    }

    this.id = post.id;
    this.userId = post.userId;
    this.type = post.type;
    this.status = post.status;
    this.originalAuthorId = post.originalAuthorId;
    this.originalPostId = post.originalPostId;
    this.isReposted = post.isReposted;
    this.title = post.title;
    this.description = post.description;
    this.link = post.link;
    this.photoLink = post.photoLink;
    this.quoteText = post.quoteText;
    this.quoteAuthor = post.quoteAuthor;
    this.postText = post.postText;
    this.videoLink = post.videoLink;
    this.announce = post.announce;

    this.tags = post.tags.map((data) =>
      TagFactory.createFromTitle({
        title: data.title,
        postId: data.postId,
      }),
    );
    this.likes = post.likes.map((data) =>
      LikeFactory.createFromUserIdAndPostId({
        userId: data.userId,
        postId: data.id ?? '',
      }),
    );

    return this;
  }

  public toPOJO(): Post {
    const post = {
      id: this.id,
      userId: this.userId,
      type: this.type,
      status: this.status,
      isReposted: this.isReposted,
      title: this.title,
      link: this.link,
      description: this.description,
      photoLink: this.photoLink,
      quoteText: this.quoteText,
      quoteAuthor: this.quoteAuthor,
      announce: this.announce,
      postText: this.postText,
      videoLink: this.videoLink,
      tags: this.tags.map((tag) => tag.toPOJO()),
      likes: this.likes.map((like) => like.toPOJO()),
    };

    return post;
  }
}
