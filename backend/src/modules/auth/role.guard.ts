import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const routeRoles = this.reflector.get<string[] | undefined>('roles', context.getHandler());
    const classRoles = this.reflector.get<string[] | undefined>('roles', context.getClass());
    const roles = routeRoles ?? classRoles;

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{ user: User | null }>();

    if (!user?.roles) {
      return false;
    }

    return user.roles.some((role) => roles.includes(role));
  }
}
