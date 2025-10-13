import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Address, AddressSchema } from './schemas/address.schema';
import { MongoDBConfig } from '@infrastructure/config/mongodb.config';

@Module({
  imports: [
    MongoDBConfig,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DBMongooseModule {}
