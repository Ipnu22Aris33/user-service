import { PasswordHasherPort } from '@core/application/ports/password-hasher.port';
import bcrypt from 'bcrypt';

export class BcryptPasswordHasherAdapter implements PasswordHasherPort {
  private readonly saltRounds: number;

  constructor(saltRounds = 10) {
    this.saltRounds = saltRounds;
  }

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    console.log('compare inputs:', { password, hash });
    if (!password || !hash) {
      return false;
    }
    return await bcrypt.compare(password, hash);
  }
}
