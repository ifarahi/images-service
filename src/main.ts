import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(
    path.join(__dirname, '..', process.env.UPLOAD_DST || './uploads'),
    {
      prefix: '/static/',
    },
  );
  await app.listen(3000);
}
bootstrap();
