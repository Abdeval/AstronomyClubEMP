import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export const User: () => ParameterDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export class UserDecorator {
  @IsUUID()
  sub: UUID;

  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;
}
