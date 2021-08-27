import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorizationHeader = request.get('Authorization');

    if (!authorizationHeader) {
      throw new UnauthorizedException('Api key does not exist');
    }
    const apiKey = authorizationHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(apiKey);
      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Api key');
    }
  }
}
