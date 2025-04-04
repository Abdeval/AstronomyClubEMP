import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';

@Module({
  imports: [
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: join(__dirname, '..', '..', 'uploads'),
    //     filename: (req, file, cb) => {
    //       const uniqueFilename = `${uuidv4()}${extname(file.originalname)}`;
    //       cb(null, uniqueFilename);
    //     },
    //   }),
    // }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
