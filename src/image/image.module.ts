import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from 'src/user/user.module';
import { ImageController } from './controllers/image.controller';
import { ImageService } from './services/image.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
    MulterModule.register({
      storage: ImageService.getStorage(process.env.UPLOAD_DST || './uploads'),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
