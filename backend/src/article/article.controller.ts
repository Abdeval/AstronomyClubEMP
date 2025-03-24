import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto';

@Controller('articles')
export class ArticleController {
    constructor(private articleServie: ArticleService) {}
    
    @HttpCode(HttpStatus.ACCEPTED)
    @Get(":id")
    getArticleById(@Param("id") articleId: string) {
        return this.articleServie.getArticleById(articleId);
    }
    
    @HttpCode(HttpStatus.CREATED)
    @Post("create")
    addArticle(@Body() dto: ArticleDto) {
        return this.articleServie.addArticle(dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete("delete/:id")
    deleteArticle(@Param("id") articleId: string) {
        return this.articleServie.deleteArticle(articleId);
    }

 }
