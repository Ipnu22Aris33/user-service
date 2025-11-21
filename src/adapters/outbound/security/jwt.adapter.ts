import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtServicePort, JwtSignOptions, JwtVerifyOptions } from '@core/application/ports/jwt-service.port';

@Injectable()
export class JwtServiceAdapter implements JwtServicePort {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: Record<string, any>, options?: JwtSignOptions): Promise<string> {
    return this.jwtService.signAsync(payload, options);
  }

  async verify<T extends object = any>(token: string, options?: JwtVerifyOptions): Promise<T> {
  return this.jwtService.verifyAsync<T>(token, options);
}
}
