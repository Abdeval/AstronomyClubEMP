import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { ArticleModule } from './article/article.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ObservationModule } from './observation/observation.module';

@Module({
  imports: [UserModule, TaskModule,ConfigModule.forRoot({ isGlobal: true}), PrismaModule, ArticleModule, EventModule, AuthModule, ObservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
