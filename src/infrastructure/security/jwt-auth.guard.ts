import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import type { AuthPort } from '@application/ports/auth.port';
import { ROLES_KEY } from './role.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('AuthPort') private readonly authPort: AuthPort,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Token not found');

    try {
      const user = await this.authPort.verifyToken(token);
      if (!user) throw new UnauthorizedException('User not found');

      // 🔑 cek roles dari metadata
      const requiredRoles =
        this.reflector.get<string[]>(ROLES_KEY, context.getHandler()) ?? [];

      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        throw new ForbiddenException('Insufficient permissions');
      }

      request['user'] = user;
      return true;
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return undefined;
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' && token ? token : undefined;
  }
}
