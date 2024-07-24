import { Module } from '@nestjs/common';

import { UsersController } from './user.controller';
import { UsersModule } from '@project/users';
import { getMongooseOptions, UsersConfigModule } from '@project/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    UsersConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
