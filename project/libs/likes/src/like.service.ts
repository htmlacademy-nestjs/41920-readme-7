import { ConflictException, Injectable } from '@nestjs/common';

import { LikeRepository } from './like.repository';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeService {
  constructor(private readonly likeRepository: LikeRepository) {}

  public async getLikesByPostId(postId: string): Promise<LikeEntity[]> {
    return this.likeRepository.findByPostId(postId);
  }

  public async deleteLike(postId: string, userId: string) {
    const likeEntity = await this.likeRepository.findByPostAndUserId(postId, userId);
    if (!likeEntity) {
      throw new ConflictException('likes does not exist');
    }
    await this.likeRepository.deleteById(likeEntity.id);
  }
}
