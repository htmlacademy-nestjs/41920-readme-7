import { Entity, Post, PostStatus, PostType, StorableEntity } from '@project/shared/core';
import { LikeEntity } from '@project/likes';
import { LikeFactory } from '../../likes/src/like.factory';
import { CommentEntity, CommentFactory } from '@project/comments';
import { Expose } from 'class-transformer';

export class PostEntity extends Entity implements StorableEntity<Post> {
  title?: string;
  type: PostType = PostType.TEXT;
  userId: string = '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  status: PostStatus = PostStatus.DRAFT;
  videoLink?: string;
  announce?: string;
  postText?: string;
  quoteText?: string;
  quoteAuthor?: string;
  photoLink?: string;
  link?: string;
  description?: string;
  isReposted!: boolean;
  tags: string[] = [];
  comments: CommentEntity[] = [];
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
    this.isReposted = post.isReposted;
    this.title = post.title;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.description = post.description;
    this.link = post.link;
    this.photoLink = post.photoLink;
    this.quoteText = post.quoteText;
    this.quoteAuthor = post.quoteAuthor;
    this.postText = post.postText;
    this.videoLink = post.videoLink;
    this.announce = post.announce;
    this.tags = post.tags;

    const blogCommentFactory = new CommentFactory();
    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }

    const blogLikeFactory = new LikeFactory();
    for (const like of post.likes) {
      const blogLikeEntity = blogLikeFactory.create(like);
      this.likes.push(blogLikeEntity);
    }
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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      quoteAuthor: this.quoteAuthor,
      announce: this.announce,
      tags: this.tags,
      postText: this.postText,
      videoLink: this.videoLink,
      likes: this.likes.map((likeEntity) => likeEntity.toPOJO()),
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
    };

    return post;
  }
}
