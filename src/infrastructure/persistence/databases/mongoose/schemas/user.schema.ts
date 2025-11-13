import { UserEntityProps } from '@domain/entities/user.entity';
import { UserStatusEnum } from '@domain/enums/user-status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
export class User implements UserEntityProps {
  @Prop({ required: true, type: String, unique: true }) uid: string;
  @Prop({ required: true, type: String }) email: string;
  @Prop({ required: true, type: String }) passwordHash: string;
  @Prop({ required: true, type: String }) roleUid: string;
  @Prop({ required: true, type: String }) userStatus: UserStatusEnum;
  @Prop({ default: null }) lastSignInAt: Date;
  @Prop({ default: null }) lastSignOutAt: Date;
  @Prop({ default: null }) lastPasswordChangeAt: Date;
  @Prop({ default: null }) deletedAt: Date;
  @Prop({ required: true, type: Date, default: Date.now }) createdAt: Date;
  @Prop({ required: true, type: Date, default: Date.now }) updatedAt: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
