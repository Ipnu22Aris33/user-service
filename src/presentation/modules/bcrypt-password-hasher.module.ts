import { Module } from '@nestjs/common';
import { PASSWORD_HASHER_PORT } from '@application/ports/password-hasher.port';
import { BcryptPasswordHasherAdapter } from '@infrastructure/adapters/internal/bcrypt-password-hasher.adapter';

@Module({
  providers: [
    {
      provide: PASSWORD_HASHER_PORT,
      useFactory: () => new BcryptPasswordHasherAdapter(10),
    },
  ],
  exports: [PASSWORD_HASHER_PORT],
})
export class BcryptPasswordHasherModule {}
