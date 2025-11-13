import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtServiceAdapter } from '@infrastructure/adapters/internal/jwt.adapter';
import { JWT_SERVICE_PORT } from '@application/ports/jwt-service.port';
import { JwtConfig } from '@infrastructure/config/jwt.config';

@Module({
  imports: [
    ConfigModule,
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: JwtConfig(config).secret,
        signOptions: { expiresIn: JwtConfig(config).expiresIn },
      }),
    }),
  ],
  providers: [
    {
      provide: JWT_SERVICE_PORT,
      useClass: JwtServiceAdapter,
    },
  ],
  exports: [JWT_SERVICE_PORT],
})
export class JwtModule {}
