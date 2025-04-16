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

import { GroupModule } from './group/group.module';
import { MemberModule } from './member/member.module';
import { ImageModule } from './image/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    UserModule,
    TaskModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ArticleModule,
    EventModule,
    ObservationModule,
    AuthModule,
    GroupModule,
    MemberModule,
    ImageModule,
    // PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'), 
      serveRoot: '/uploads', 
      serveStaticOptions: { index: false },
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname,'..', 'uploads'),
        filename: (req, file, cb) => {
          const uniqueFilename = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueFilename);
        },
      }),
    }),
    DashboardModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
