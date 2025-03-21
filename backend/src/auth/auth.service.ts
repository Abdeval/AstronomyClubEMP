import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./auth.dto";
import { ConfigService } from "@nestjs/config";
import { Role } from "@prisma/client";


@Injectable()
export class AuthService {
    constructor(private config: ConfigService, private prisma: PrismaService, private jwtService: JwtService) {

    }
    async signup(dto: AuthDto) {
        try {
            // generate the password hash 
            const hash = await argon.hash('12345');
            // save new user in database
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                    role: dto.role || 'MEMBER',
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

    async signin(dto: AuthDto) {
        // find the user 
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user) {
            throw new ForbiddenException('Invalid credentials');
        }
        // check the password
        if (!user.password) {
            throw new ForbiddenException('Invalid credentials'); // that the user has signed with Oauth2.0
        }
        const valid = await argon.verify(user.password, dto.password);
        if (!valid) {
            throw new ForbiddenException('Invalid credentials');
        }
        return this.signToken(user.id, user.email, user.role);
    }

    async signToken(
        id: string,
        email: string,
        role: Role
    ): Promise<{ access_token: string }> {
        const payload = { sub: id, email, role };

        const secret = this.config.get(
            'JWT_SECRET',
        );

        const token =
            await this.jwtService.signAsync(
                payload,
                { secret },
            );

        const result = {
            access_token: token,
        };
        return result;
    }

}