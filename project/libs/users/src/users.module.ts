import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersRepository } from './users.repository';
import { UsersFactory } from './users.factory';
import { UsersModel, UsersSchema } from './users.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: UsersModel.name, schema: UsersSchema }])],
  providers: [UsersRepository, UsersFactory],
  exports: [UsersRepository],
})
export class UsersModule {}
