import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const MongoDBConfig = MongooseModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    uri: config.getOrThrow<string>('MONGO_URI'),
    dbName: config.getOrThrow<string>('MONGO_DB_NAME'),
  }),
});
