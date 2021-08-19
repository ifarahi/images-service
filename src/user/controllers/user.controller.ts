import {
  Controller,
  Post,
  Body,
  ConflictException,
  UsePipes,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { map, mergeMap, Observable } from 'rxjs';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { UserService } from '../services/user.service';
import { SignupDto } from '../sign-up.dto';
import { signupSchema } from '../validation/signup.schema';
import { loginSchema } from '../validation/login.schema';
import { LoginDto } from '../login.dto';
import { LoginResponse } from '../login-response.interface';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @UsePipes(new JoiValidationPipe(signupSchema))
  signup(@Body() signupDto: SignupDto): Observable<any> {
    const email = signupDto.email;

    return this.userService.existsByEmail(email).pipe(
      mergeMap((exists) => {
        if (exists) {
          throw new ConflictException(`${email} already exists`);
        } else {
          return this.userService.create(signupDto).pipe(
            map((user) => {
              return {
                email: user.email,
                username: user.username,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              };
            }),
          );
        }
      }),
    );
  }

  @Post('login')
  @UsePipes(new JoiValidationPipe(loginSchema))
  login(@Body() loginDto: LoginDto): Observable<LoginResponse> {
    return this.userService.findByUsername(loginDto.username).pipe(
      mergeMap((user) => {
        if (!user) {
          throw new NotFoundException('user not found');
        }

        return this.userService
          .comparePassword(loginDto.password, user.password)
          .pipe(
            map((comparisonResult) => {
              if (!comparisonResult) {
                throw new UnauthorizedException('invalid credentials');
              }
              const apiKey = this.userService.prepareApiKey(user);
              this.userService.saveApiKey(user.id, apiKey);

              return { apiKey };
            }),
          );
      }),
    );
  }
}
