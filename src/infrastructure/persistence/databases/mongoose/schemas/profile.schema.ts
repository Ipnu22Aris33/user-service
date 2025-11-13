import { ProfileEntity, ProfileEntityProps } from '@domain/entities/profile.entity';
import { ProfileStatusEnum } from '@domain/enums/profile-status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'profiles' })
export class Profile implements ProfileEntityProps {
  @Prop({ required: true, type: String, unique: true }) uid: string;
  @Prop({ required: true, type: String }) userUid: string;
  @Prop({ required: true, type: String }) fullName: string;
  @Prop({ required: true, type: String }) phoneNumber: string;
  @Prop({ required: true, type: String, default: null }) avatarUrl: string;
  @Prop({ required: true, enum: ProfileStatusEnum }) profileStatus: ProfileStatusEnum;
  @Prop({ default: null }) deletedAt: Date;
  @Prop({ required: true, default: Date.now }) createdAt: Date;
  @Prop({ required: true, default: Date.now }) updatedAt: Date;
}
export type ProfileDocument = Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
