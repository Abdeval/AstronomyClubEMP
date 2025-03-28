import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, LoginDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          password: hash,
          role: dto.role || 'USER',
        },
      });

      const { id, password, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Email not found');
    }
    if (!user.password) {
      throw new ForbiddenException('Password missing');
    }
    const valid = await argon.verify(user.password, dto.password);
    if (!valid) {
      throw new ForbiddenException("Password doesn't match");
    }
    // console.log(user);
    const token = await this.signToken(user.id, user.email, user.role);
    return {
      role: user.role,
      access_token: token
    }
  }

  async signToken(
    id: string,
    email: string,
    role: Role,
  ): Promise<string> {
    const payload = { sub: id, email, role };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, { secret });
    return token;
  }
}
