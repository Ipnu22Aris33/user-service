import { TokenEntityProps } from "@core/domain/entities/token.entity";
import { TokenTypeEnum } from "src/core/common/enums/token-type.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Token  implements TokenEntityProps {
    @Prop({ required: true, type: String, unique: true }) uid: string;
    @Prop({ required: true, type: String }) userUid: string;
    @Prop({ required: true, type: String }) tokenType: TokenTypeEnum;
    @Prop({ required: true, type: String }) token: string;
    @Prop({ required: true, type: Date }) expiresAt: Date;
    @Prop({ required: true, type: Date }) issuedAt: Date;
    @Prop({ required: true, type: Boolean, default: false }) isRevoked: boolean;
    @Prop({ default: Date.now }) createdAt: Date;
    @Prop({ default: Date.now }) updatedAt: Date;
    @Prop({ default: null }) deletedAt: Date;
}

export type TokenDocument = Token & Document;
export const TokenSchema = SchemaFactory.createForClass(Token);