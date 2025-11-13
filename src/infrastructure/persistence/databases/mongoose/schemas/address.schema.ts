import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ActivateStatusEnum } from '@domain/enums/activate-status.enum';

@Schema({ collection: 'addresses' })
export class Address extends Document  {
  @Prop({ required: true, unique: true }) uid: string;
  @Prop({ type: String, required: true }) userUid: string;
  @Prop({ required: true }) label: string;
  @Prop({ required: true }) recipientName: string;
  @Prop({ required: true }) phoneNumber: string;
  @Prop({ required: true }) addressLine1: string;
  @Prop({ default: null }) addressLine2: string;
  @Prop({ required: true }) city: string;
  @Prop({ required: true }) region: string;
  @Prop({ required: true }) country: string;
  @Prop({ required: true }) postalCode: string;
  @Prop({ enum: ActivateStatusEnum }) status: ActivateStatusEnum;
  @Prop({ default: false }) isDefault: boolean;
  @Prop({ default: Date.now }) createdAt: Date;
  @Prop({ default: Date.now }) updatedAt: Date;
  @Prop({ default: null }) deletedAt: Date;
}

export type AddressDocument = Address & Document;
export const AddressSchema = SchemaFactory.createForClass(Address);
