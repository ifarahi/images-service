import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, mergeMap, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { SignupDto } from '../sign-up.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<User>) {}

  create(signupDto: SignupDto): Observable<User> {
    const currentDate = new Date();

    return this.hashPassword(signupDto.password).pipe(
      mergeMap((hashedPassword) => {
        return from(
          this.userModel.create({
            ...signupDto,
            password: hashedPassword,
            createdAt: currentDate,
            updatedAt: currentDate,
          }),
        );
      }),
    );
  }

  existsByEmail(email: string): Observable<boolean> {
    return from(this.userModel.exists({ email }));
  }

  hashPassword(password: string): Observable<string> {
    const saltOrRounds = 10;
    return from(bcrypt.hash(password, saltOrRounds));
  }
}
