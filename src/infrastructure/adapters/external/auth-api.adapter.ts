import { AuthPort } from '@application/ports/auth.port';
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthApiAdapter implements AuthPort, OnModuleInit {
  private baseUrl!: string;
  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpService,
  ) {}

  onModuleInit() {
    this.baseUrl = this.config.get<string>('AUTH_SERVICE_URL') ?? '';
    if (!this.baseUrl) {
      throw new InternalServerErrorException(
        'Missing AUTH_SERVICE_URL configuration',
      );
    }
  }
  async verifyToken(token: string): Promise<any> {
    const res = await this.http.axiosRef.post(
      `${this.baseUrl}/auth/validate`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('res.data', res.data);
    return res.data;
  }
}
