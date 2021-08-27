import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, mergeMap, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { SignupDto } from '../sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from '../jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

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

  addImage(id: string, image: string): Observable<any> {
    return from(
      this.userModel.updateOne({ _id: id }, { $push: { images: image } }),
    );
  }

  existsByEmail(email: string): Observable<boolean> {
    return from(this.userModel.exists({ email }));
  }

  hashPassword(password: string): Observable<string> {
    const saltOrRounds = 10;
    return from(bcrypt.hash(password, saltOrRounds));
  }

  findByUsername(username: string): Observable<User> {
    return from(this.userModel.findOne({ username }));
  }

  comparePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Observable<boolean> {
    return from(bcrypt.compare(plainTextPassword, hashedPassword));
  }

  saveApiKey(userId: string, apiKey: string): void {
    this.userModel.findByIdAndUpdate(userId, { apiKey });
  }

  prepareApiKey(user: User): string {
    const payload: jwtPayload = {
      sub: user.id,
      username: user.username,
    };
    return this.jwtService.sign(payload);
  }
}
