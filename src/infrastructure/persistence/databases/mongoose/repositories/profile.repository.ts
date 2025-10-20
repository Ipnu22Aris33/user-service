import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from '../schemas/profile.schema';
import { Model } from 'mongoose';
import { ProfileOutPort } from '@application/ports/out/profile.out-port';
import { ProfileEntity } from '@domain/entities/profile.entity';
import { ProfileMapper } from '@infrastructure/persistence/mappers/profile.mapper';

@Injectable()
export class ProfileRepository implements ProfileOutPort {
  constructor(
    @InjectModel(Profile.name) private readonly model: Model<ProfileDocument>,
  ) {}
  async save(profile: ProfileEntity): Promise<void> {
    const persistence = ProfileMapper.toPersistense(profile);
    const filter = { uid: persistence.uid };
    await this.model.findOneAndUpdate(filter, persistence, {
      upsert: true,
      new: true,
    });
  }

  async findByUid(uid: string): Promise<ProfileEntity | null> {
    return null;
  }

  async findByUserUid(uid: string): Promise<ProfileEntity | null> {
    return null;
  }
}
