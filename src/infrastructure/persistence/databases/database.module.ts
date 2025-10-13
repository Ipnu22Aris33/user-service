// src/infrastructure/database/database.module.ts
import { Module } from '@nestjs/common';
import { DBMongooseModule } from './mongoose/db-mongoose.module';

@Module({
  imports: [DBMongooseModule],
  exports: [DBMongooseModule],
})
export class DatabaseModule {}
