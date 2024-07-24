import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersFactory } from './users.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModel, UsersSchema } from './users.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: UsersModel.name, schema: UsersSchema }])],
  exports: [UsersService],
  providers: [UsersService, UsersRepository, UsersFactory],
})
export class UsersModule {}
