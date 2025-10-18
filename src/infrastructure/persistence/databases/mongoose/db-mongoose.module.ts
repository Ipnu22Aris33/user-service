import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './schemas/address.schema';
import { MongoDBConfig } from '@infrastructure/config/mongodb.config';
import { Profile, ProfileSchema } from './schemas/profile.schema';

@Module({
  imports: [
    MongoDBConfig,
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DBMongooseModule {}
