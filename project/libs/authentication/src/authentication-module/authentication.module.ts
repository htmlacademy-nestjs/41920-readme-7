import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { getJwtOptions } from '@project/config';
import { UsersModule } from '@project/users';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token-module/refresh-token.module';
import { LocalStrategy } from '../strategies/local.strategy';
import { NotifyModule } from '@project/auth-notify';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    RefreshTokenModule,
    NotifyModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
  ],
})
export class AuthenticationModule {}
