import { NestFactory } from '@nestjs/core';
import { UserModule } from '@presentation/module/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.listen(process.env.PORT ?? 3010);
}
bootstrap();
