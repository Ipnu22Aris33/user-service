import { Injectable } from '@nestjs/common';
import { TokenOutPort } from '@core/application/ports/token.port';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from '../schemas/token.schema';
import { Model } from 'mongoose';
import { TokenDocument } from '../schemas/token.schema';
import { TokenEntity } from '@core/domain/entities/token.entity';
import { TokenMapper } from 'src/adapters/outbound/persistence/mappers/token.mapper';

@Injectable()
export class TokenRepository implements TokenOutPort {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}

  async save(token: TokenEntity): Promise<TokenEntity> {
    const data = TokenMapper.toPersistence(token);
    const res = await this.tokenModel
      .findOneAndUpdate({ token: data.token }, { $set: data }, { upsert: true, new: true })
      .lean().exec();

    return TokenMapper.toDomain(res);
  }

  async findByToken(token: string): Promise<TokenEntity | null> {
    const res = await this.tokenModel.findOne({ token }).lean().exec();
    return res ? TokenMapper.toDomain(res) : null;
  }

  async findByUserUid(userUid: string): Promise<TokenEntity | null> {
    const res = await this.tokenModel.findOne({ userUid }).lean().exec();
    return res ? TokenMapper.toDomain(res) : null;
  }
}
