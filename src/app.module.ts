import { Module } from '@nestjs/common';
import { UserModule } from '@presentation/module/user.module';
import { DatabaseModule } from '@infrastructure/persistence/databases/database.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from '@presentation/module/address.module';
import { AuthModule } from '@infrastructure/security/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AddressModule,
    // AuthModule,
  ],
})
export class AppModule {}
