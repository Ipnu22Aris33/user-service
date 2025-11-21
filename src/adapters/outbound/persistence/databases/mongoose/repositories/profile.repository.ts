import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from '../schemas/profile.schema';
import { Model } from 'mongoose';
import { ProfileOutPort } from '@core/application/ports/profile.port';
import { ProfileEntity } from '@core/domain/entities/profile.entity';
import { ProfileMapper } from 'src/adapters/outbound/persistence/mappers/profile.mapper';

@Injectable()
export class ProfileRepository implements ProfileOutPort {
  constructor(
    @InjectModel(Profile.name) private readonly model: Model<ProfileDocument>,
  ) {}

  async save(profile: ProfileEntity): Promise<ProfileEntity> {
    const persistence = ProfileMapper.toPersistence(profile);
    const filter = { uid: persistence.uid };
    const doc = await this.model.findOneAndUpdate(filter, persistence, {
      upsert: true,
      new: true,
    }).lean();
    return ProfileMapper.toDomain(doc);
  }

  async findByUid(uid: string): Promise<ProfileEntity | null> {
    if (!uid) return null;

    const doc = await this.model.findOne({ uid }).lean();
    return doc ? ProfileMapper.toDomain(doc) : null;
  }

  async findByUserUid(userUid: string): Promise<ProfileEntity | null> {
    if (!userUid) return null;

    const doc = await this.model.findOne({ userUid: userUid }).lean();
    return doc ? ProfileMapper.toDomain(doc) : null;
  }
}
