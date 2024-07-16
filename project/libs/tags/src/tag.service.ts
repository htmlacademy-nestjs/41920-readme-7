import {
  ConflictException,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  public async getAllTags() {
    return this.tagRepository.findAll();
  }

  public async getTagsByIds(tagIds: string[]) {
    return await this.tagRepository.findByIds(tagIds);
  }

  public async createTag(dto: CreateTagDto) {
    dto.title = dto.title.toLowerCase();

    const existsTag = await this.tagRepository.findByTitle(dto.title);

    if (existsTag) {
      throw new ConflictException(`Tag already exists`);
    }

    const allTags = await this.tagRepository.findAll();
    if (allTags.length > 8) {
      throw new MethodNotAllowedException(`Max 8 tags`);
    }

    if (dto.title.length < 3 || dto.title.length > 10) {
      throw new MethodNotAllowedException(`Min len 3, max len 10`);
    }
    const tagEntity = new TagEntity(dto);
    await this.tagRepository.save(tagEntity);

    return tagEntity;
  }

  public async deleteTag(tagId: string) {
    try {
      await this.tagRepository.deleteById(tagId);
    } catch {
      throw new NotFoundException(`Tag with id «${tagId}» not found`);
    }
  }
}
