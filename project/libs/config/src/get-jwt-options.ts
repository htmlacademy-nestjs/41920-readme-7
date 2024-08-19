import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export async function getJwtOptions(
  configService: ConfigService,
): Promise<JwtModuleOptions> {
  return {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      algorithm: 'HS256',
    },
  };
}
