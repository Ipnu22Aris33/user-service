import { UserOutPort } from '@application/ports/user.port';
import { UserEntity } from '@domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UserMapper } from '@infrastructure/persistence/mappers/user.mapper';

@Injectable()
export class UserRepository implements UserOutPort {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async save(user: UserEntity): Promise<UserEntity> {
    const data = UserMapper.toPersistence(user);
    
    const result = await this.userModel
      .findOneAndUpdate({ uid: data.uid }, { $set: data }, { new: true, upsert: true })
      .lean();
    return UserMapper.toDomain(result);
  }

  async findByUid(uid: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findOne({ uid }).lean();
    return doc ? UserMapper.toDomain(doc) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findOne({ email }).lean();
    console.log(doc);
    return doc ? UserMapper.toDomain(doc) : null;
  }
}
