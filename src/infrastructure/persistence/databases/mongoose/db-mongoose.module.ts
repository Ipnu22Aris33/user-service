import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBConfig } from '@infrastructure/config/mongodb.config';
import { Address, AddressSchema } from './schemas/address.schema';
import { User, UserSchema } from './schemas/user.schema';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { Role, RoleSchema } from './schemas/role.schema';
import { Token, TokenSchema } from './schemas/token.schema';

@Module({
  imports: [
    MongoDBConfig,
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: Address.name, schema: AddressSchema },
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DBMongooseModule {}
