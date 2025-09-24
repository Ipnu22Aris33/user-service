import { Module } from '@nestjs/common';
import { UserModule } from '@presentation/module/user.module';
import { DBMongooseModule } from '@infrastructure/databases/module/db-mongoose.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DBMongooseModule,
    UserModule,
  ],
})
export class AppModule {}
