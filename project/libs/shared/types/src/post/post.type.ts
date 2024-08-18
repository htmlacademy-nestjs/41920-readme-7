import { PostType } from './post-type.enum';
import { PostStatus } from './post-status.enum';
import { Like } from './like.type';
import { Comment } from './comment.type';

export type Post = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  type: PostType;
  status: PostStatus;
  isReposted: boolean;
  title?: string;
  link?: string;
  description?: string;
  photoLink?: string;
  quoteText?: string;
  quoteAuthor?: string;
  announce?: string;
  postText?: string;
  videoLink?: string;
  tags: string[];
  likes: Like[];
  comments: Comment[];
};
