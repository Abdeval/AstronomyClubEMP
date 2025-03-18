import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./auth.dto";
@Injectable()


export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {

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
                    role: 'MEMBER',
                },
            });
            const {id, password, ...result } = user;
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
        return  {
            access_token : await this.jwtService.signAsync({ sub: user.id,email: user.email }),
            user : {
                firstName: user.firstName,
                lastName : user.lastName,
                email: user.email,
                role: user.role
            }
        };
    }

}