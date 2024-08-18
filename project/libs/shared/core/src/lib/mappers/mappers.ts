import {
  PostType as PrismaPostType,
  StatusType as PrismaPostStatus,
} from '@prisma/client';
import { PostStatus, PostType } from '@project/types';

export function mapPostType(type: PostType): PrismaPostType {
  switch (type) {
    case PostType.QUOTE:
      return PrismaPostType.QUOTE;
    case PostType.PHOTO:
      return PrismaPostType.PHOTO;
    case PostType.VIDEO:
      return PrismaPostType.VIDEO;
    case PostType.TEXT:
      return PrismaPostType.TEXT;
    case PostType.LINK:
      return PrismaPostType.LINK;
    default:
      throw new Error(`Unknown post type: ${type}`);
  }
}

export function mapPostStatus(type: PostStatus): PrismaPostStatus {
  switch (type) {
    case PostStatus.PUBLISHED:
      return PrismaPostStatus.PUBLISHED;
    case PostStatus.DRAFT:
      return PrismaPostStatus.DRAFT;
    default:
      throw new Error(`Unknown post type: ${type}`);
  }
}
