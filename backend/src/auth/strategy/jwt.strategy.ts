import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

import { PassportStrategy } from '@nestjs/passport';
import {
  Prisma,
  User,
} from '@prisma/client';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
// import { ConfigService } from '../../../src/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get(
        'JWT_SECRET',
      ) as string,
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
  }) {
    const data: User | null =
      await this.prisma.user.findUnique(
        {
          where: {
            id: payload.sub,
          },
        },
      );

    return {
      email: data?.email,
      id: data?.id,
    //   createdAt: data?.createdAt,
    };
  }
}
