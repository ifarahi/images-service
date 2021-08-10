import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

ConfigModule.forRoot();

@Module({
  imports: [UserModule, MongooseModule.forRoot(process.env.DB_URL)],
  controllers: [],
  providers: [],
})
export class AppModule {}
