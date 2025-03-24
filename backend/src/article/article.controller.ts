import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './article.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User, UserDecorator } from 'src/user/user.decorator';

@Controller('articles')
export class ArticleController {
    constructor(private articleServie: ArticleService) {}
    
    // @HttpCode(HttpStatus.ACCEPTED)
    @Get(":id")
    getArticleById(@Param("id") articleId: string) {
        return this.articleServie.getArticleById(articleId);
    }
    
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post("create")
    addArticle(@User() user : any ,@Body() dto: ArticleDto) {
        return this.articleServie.addArticle(user, dto);
    }
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete("delete/:id")
    deleteArticle(@User() user: UserDecorator,@Param("id") articleId: string) {
        return this.articleServie.deleteArticle(user,articleId);
    }

 }
