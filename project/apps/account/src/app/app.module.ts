import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '@project/authentication';
import { UsersModule } from '@project/users';
import { getMongooseOptions, UsersConfigModule } from '@project/config';
import { NotifyModule } from '@project/auth-notify';

@Module({
  imports: [
    UsersModule,
    AuthenticationModule,
    UsersConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
