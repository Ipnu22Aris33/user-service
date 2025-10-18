import { ProfilePort } from '@application/ports/profile.port';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from '../schemas/profile.schema';
import { Model } from 'mongoose';
import { ProfileEntity } from '@domain/entities/profile.entity';
import { ProfileMapper } from '@infrastructure/persistence/mappers/profile.mapper';

@Injectable()
export class ProfileRepository implements ProfilePort {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  async save(profile: ProfileEntity): Promise<void> {
    await this.saveProfile(profile);
  }

  async findByUid(uid: string): Promise<ProfileEntity | null> {
    return null;
  }

  private async saveProfile(profile: ProfileEntity): Promise<void> {
    const doc = ProfileMapper.toPersistense(profile);
    await this.profileModel.findOneAndUpdate({ uid: doc.uid }, doc, {
      upsert: true,
    });
  }
}
