import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthApiAdapter } from '@infrastructure/adapters/external/auth-api.adapter';
import { HttpModule } from '@nestjs/axios'; // kalau perlu panggil external API

@Module({
  imports: [HttpModule],
  providers: [
    JwtAuthGuard,
    {
      provide: 'AuthPort',
      useClass: AuthApiAdapter,
    },
  ],
  exports: [JwtAuthGuard, 'AuthPort'],
})
export class AuthModule {}
