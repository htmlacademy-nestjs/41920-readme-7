import { Module } from '@nestjs/common';

import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { LikeFactory } from './like.factory';

@Module({
  providers: [LikeService, LikeRepository, LikeFactory],
  exports: [LikeService, LikeRepository, LikeFactory],
})
export class LikeModule {}
