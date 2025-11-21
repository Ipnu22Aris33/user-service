import { RoleEntityProps } from "@core/domain/entities/role.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Role implements RoleEntityProps {
    @Prop({ required: true, type: String, unique: true }) uid: string;
    @Prop({ required: true, type: String }) name: string;
    @Prop({ required: true, type: String }) description: string;
    @Prop({ required: true, type: Boolean }) isDefault: boolean;
    @Prop({ default: Date.now }) createdAt: Date;
    @Prop({ default: Date.now }) updatedAt: Date;
    @Prop({ default: null }) deletedAt: Date;
}

export type RoleDocument = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);   