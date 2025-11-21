import { DatabaseModule } from 'src/adapters/outbound/persistence/databases/database.module';
import { TOKEN_OUT_PORT } from '@core/application/ports/token.port';
import { Module } from '@nestjs/common';
import { TokenRepository } from 'src/adapters/outbound/persistence/databases/mongoose/repositories/token.repository';

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
