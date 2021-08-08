import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: UserSchema }])],
})
export class UserModule {}
