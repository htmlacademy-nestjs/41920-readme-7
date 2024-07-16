import { PostType } from './post-type.enum';
import { Tag } from './tag.type';
import { PostStatus } from './post-status.enum';
import { Like } from './like.type';

export type Post = {
  id: string;
  userId: string;
  originalAuthorId?: string;
  originalPostId?: string;
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
  tags: Tag[];
  likes: Like[];
  // comments: Comment[];
};
