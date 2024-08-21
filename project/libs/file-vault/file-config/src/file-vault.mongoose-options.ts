import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { getMongoConnectionString } from '@project/shared/helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      console.log('epta', config);
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('vault.db.user'),
          password: config.get<string>('vault.db.password'),
          host: config.get<string>('vault.db.host'),
          port: config.get<string>('vault.db.port'),
          authDatabase: config.get<string>('vault.db.authBase'),
          databaseName: config.get<string>('vault.db.name'),
        }),
      };
    },
    inject: [ConfigService],
  };
}
