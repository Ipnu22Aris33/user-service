import { ProfileStatusEnumType } from '@domain/value-objects/profile-status.vo';
import { ProfileModel } from '@infrastructure/persistence/models/profile.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document implements ProfileModel {
  @Prop({ required: true, type: String, unique: true }) uid: string;
  @Prop({ required: true, type: String }) userUid: string;
  @Prop({ required: true, type: String }) fullName: string;
  @Prop({ required: true, type: String }) phoneNumber: string;
  @Prop({ required: true, enum: ProfileStatusEnumType }) profileStatus: ProfileStatusEnumType;
  @Prop({ required: true, type: String, default: Date.now }) createdAt: Date;
  @Prop({ required: true, type: String, default: Date.now }) updatedAt: Date;
}
export type ProfileDocument = Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
