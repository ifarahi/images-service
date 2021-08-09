import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { map, mergeMap, Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { SignupDto } from '../sign-up.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
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
              };
            }),
          );
        }
      }),
    );
  }
}
