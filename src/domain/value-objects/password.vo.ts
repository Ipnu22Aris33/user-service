import { BaseVO } from '@domain/base/base.vo';
import * as bcrypt from 'bcrypt';

export class PasswordVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static async create(value: string): Promise<PasswordVO> {
    this.validate(value);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(value, salt);
    return new PasswordVO(hashedPassword);
  }

  static async verify(plain: string, hashed: string) {
    return await bcrypt.compare(plain, hashed);
  }

  async compare(value: string) {
    return await bcrypt.compare(value, this.value);
  }

  static fromValue(value: string): PasswordVO {
    return new PasswordVO(value);
  }

  private static validate(value: string) {
    if (value.length < 6)
      throw new Error('Password must be at least 6 characters');
    if (!/[a-z]/.test(value))
      throw new Error('Password must have at least one lowercase letter');
    if (!/[A-Z]/.test(value))
      throw new Error('Password must have at least one uppercase letter');
    if (!/[0-9]/.test(value))
      throw new Error('Password must have at least one number');
  }
}
