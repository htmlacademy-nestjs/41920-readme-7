import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersFactory } from './users.factory';

@Module({
  exports: [UsersService],
  providers: [UsersService, UsersRepository, UsersFactory],
})
export class UsersModule {}
