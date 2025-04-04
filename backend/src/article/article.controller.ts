import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from './article.service';

import { User, UserDecorator } from 'src/user/user.decorator';
import { JwtGuard } from 'src/auth/auth.guard';
import { AddArticleDto, UpdateArticleDto } from './article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/storage.config';

@Controller('articles')
export class ArticleController {
  constructor(private articleServie: ArticleService) { }

  // @HttpCode(HttpStatus.ACCEPTED)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getArticleById(@Param('id') articleId: string) {
    return this.articleServie.getArticleById(articleId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllArticles() {
    return this.articleServie.getAllArticles();
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file', storageConfig))
  @Post('create')
  addArticle(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: AddArticleDto,
    @User('id') userId: string
  ) {
    return this.articleServie.addArticle(dto, file, userId);
    // console.log(userId, file, dto);
    // return userId;
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file', storageConfig))
  @Patch("update/:id")
  updateArticle(
    @User() user: UserDecorator, 
    @Body() dto: UpdateArticleDto, 
    @Param("id") articleId: string
  ) {
    return this.articleServie.updateArticle(user, articleId, dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  deleteArticle(@User() user: UserDecorator, @Param('id') articleId: string) {
    return this.articleServie.deleteArticle(user, articleId);
  }
}
