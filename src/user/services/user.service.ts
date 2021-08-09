import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { SignupDto } from '../sign-up.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<User>) {}

  create(signupDto: SignupDto): Observable<User> {
    return from(this.userModel.create({ ...signupDto }));
  }

  existsByEmail(email: string): Observable<boolean> {
    return from(this.userModel.exists({ email }));
  }
}
