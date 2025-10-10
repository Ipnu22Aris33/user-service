// src/infrastructure/repositories/mongoose-user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserDocument,
} from '@infrastructure/databases/schemas/user.schema';
import { UserPort } from '@application/ports/user.port';
import { UserEntity } from '@domain/entities/user.entity';
import { UserMapper } from '@infrastructure/mappers/user.mapper';

@Injectable()
export class UserRepository implements UserPort {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async save(user: UserEntity): Promise<UserEntity> {
    const persistence = UserMapper.toPersistence(user);
    const filter = { uid: persistence.uid };
    const options = { new: true, upsert: true };
    const doc = this.userModel
      .findOneAndUpdate(filter, persistence, options)
      .then((doc) => {
        if (doc) return UserMapper.fromPersistence(doc);
        throw new Error('Failed to upsert user');
      });
    return doc;
  }

  async findByUid(uid: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findOne({ uid }).exec();
    return doc ? UserMapper.fromPersistence(doc) : null;
  }
}
