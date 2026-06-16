import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { type Role } from '../types';

export type CurrentUserType = {
  id: string;
  role: Role;
};

type CurrentUserKey = keyof CurrentUserType;

export const CurrentUser = createParamDecorator(
  (data: CurrentUserKey | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request['user'] as CurrentUserType;

    if (user) {
      if (data) return user[data];
      return user;
    }

    throw new UnauthorizedException('Invalid or expired access token');
  },
);
