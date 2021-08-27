import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { JwtModule } from '@nestjs/jwt';

ConfigModule.forRoot();

@Module({
  imports: [
    ImageModule,
    UserModule,
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
