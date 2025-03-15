import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule,UserModule, PrismaModule, JwtModule.register({
    secret: new ConfigService().get<string>('JWT_SECRET'),
     global: true,
     signOptions: { expiresIn: '7d' }
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
