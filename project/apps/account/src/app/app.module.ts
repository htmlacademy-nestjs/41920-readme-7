import { Module } from '@nestjs/common';

import { UsersController } from './user.controller';
import { UsersModule } from '@project/users';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
