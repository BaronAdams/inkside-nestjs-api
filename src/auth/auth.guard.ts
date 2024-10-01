import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private userService: UserService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.SECRET_KEY
          }
        );
        // 💡 Nous attribuons ici le payload à l'objet de la requête
        // afin que nous puissions y accéder dans nos gestionnaires de routes
        let user = await this.userService.findById(payload.id);
        if(!user){
            throw new UnauthorizedException();
        }
        const { password, ...others } = user
        request['user'] = others
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: FastifyRequest['raw']): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }