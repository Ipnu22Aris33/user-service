import { DatabaseModule } from '@infrastructure/persistence/databases/database.module';
import { TOKEN_OUT_PORT } from '@application/ports/token.port';
import { Module } from '@nestjs/common';
import { TokenRepository } from '@infrastructure/persistence/databases/mongoose/repositories/token.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: TOKEN_OUT_PORT,
      useClass: TokenRepository,
    },
  ],
  exports: [TOKEN_OUT_PORT],
})
export class TokenModule {}
