import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { stringify } from 'querystring';
import { CreateImageDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from '../config/storage.config';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Get()
  getAllImages() {
    return this.imageService.getAllImages();
  }

  @Get(":id")
  getImageById(@Param('id') imageId: string) {
    return this.imageService.getImageById(imageId);
  }

  @Get('category/:categoryName/:categoryId')
  getImagesByCategory(@Param() params: { categoryName: string; categoryId: string }) {
    return this.imageService.getImagesByCategory(params.categoryName, params.categoryId);
  }

  @UseInterceptors(FileInterceptor('file', storageConfig))
  @Post('create')
  addImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateImageDto
  ) {
    console.log(file);
    return this.imageService.addImage(dto, file);
  }

  @Delete('delete/:id')
  deleteImage(@Param("id") imageId: string) {
    return this.imageService.deleteImage(imageId);
  }
}
