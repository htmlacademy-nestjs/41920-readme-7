import { ConflictException, Injectable } from '@nestjs/common';

import { LikeRepository } from './like.repository';
import { LikeEntity } from './like.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeFactory } from './like.factory';

@Injectable()
export class LikeService {
  constructor(private readonly likeRepository: LikeRepository) {}

  public async getLikesByPostId(postId: string): Promise<LikeEntity[]> {
    return this.likeRepository.findByPostId(postId);
  }

  public async createLike(dto: CreateLikeDto): Promise<LikeEntity> {
    const likes = await this.likeRepository.findByPostAndUserId(dto.postId, dto.userId);
    if (likes) {
      throw new ConflictException('already liked post');
    }

    const likeEntity = LikeFactory.createFromUserIdAndPostId(dto);
    await this.likeRepository.save(likeEntity);

    return likeEntity;
  }

  public async deleteLike(postId: string, userId: string) {
    const likeEntity = await this.likeRepository.findByPostAndUserId(postId, userId);
    if (!likeEntity) {
      throw new ConflictException('likes does not exist');
    }
    await this.likeRepository.deleteById(likeEntity.id);
  }
}
