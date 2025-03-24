import { ForbiddenException, Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArticleDto } from './dto';

@Injectable()
export class ArticleService {
    constructor(private prisma: PrismaService) { };

    // ! get an article by id
    async getArticleById(articleId: string): Promise<Article | undefined> {
        try {
            const article = await this.prisma.article.findUnique({
                where: {
                    id: articleId
                }
            });

            if(!article) throw new ForbiddenException("No article with this id");
            return article;

        } catch (err: any) {
            console.error(err);
        }
    }

    // ! add an article
    async addArticle(dto: ArticleDto): Promise<any> {
        try {
            // ! check if the author is exist
            const isRealAuthor = await this.prisma.user.findUnique({
                where: {
                    id: dto.authorId
                }
            });

            if(!isRealAuthor) throw new ForbiddenException("author not found"); 

            const res = await this.prisma.article.create({
                data: {
                    title: dto.title,
                    content: dto.content as string,
                    authorId: dto.authorId
                }
            });

            console.log(res);
            return res;
        } catch (err: any) {
            console.error(err);
        }
    }

    // ! delete an article 
    async deleteArticle(articleId: string) {
        try {
            const res = await this.prisma.article.delete({
                where: {
                    id: articleId
                }
            });

            if(!res) throw new ForbiddenException("no article with this id");
            return { message: "article deleted" }
        } catch (err: any) {
            console.error(err);
        }
    }

}
