import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  mixin,
  Type,
} from '@nestjs/common';

import { type Role } from '../types';

export function RoleGuard(role: Role[]): Type<CanActivate> {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();

      const user = request.user as {
        id: string;
        role: Role;
      };

      if (!user || !role.includes(user.role)) {
        throw new ForbiddenException(
          'You do not have permission to access this resource',
        );
      }

      return true;
    }
  }

  return mixin(RoleGuardMixin);
}
