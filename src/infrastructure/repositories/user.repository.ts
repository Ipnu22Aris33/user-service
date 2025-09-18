// src/infrastructure/repositories/mongoose-user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@infrastructure/databases/mongoose/schemas/user.schema';
import { IUserRepository } from '@application/ports/user.repository.port';
import { UserEntity } from '@domain/entities/user.entity';
import { UserMapper } from '@infrastructure/mappers/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async save(user: UserEntity): Promise<UserEntity> {
    const userPersistence = UserMapper.toPersistence(user);
    const userDocument = await this.userModel.create(userPersistence);
    return UserMapper.toEntity(userDocument);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const userDocument = await this.userModel.findOne({ email }).exec();
    return userDocument ? UserMapper.toEntity(userDocument) : null;
  }
}
