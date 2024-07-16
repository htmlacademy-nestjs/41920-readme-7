import { Module } from '@nestjs/common';

import { TagService } from './tag.service';
import { TagRepository } from './tag.repository';
import { TagFactory } from './tag.factory';

@Module({
  exports: [TagService, TagRepository, TagFactory],
  providers: [TagService, TagRepository, TagFactory],
})
export class TagModule {}
