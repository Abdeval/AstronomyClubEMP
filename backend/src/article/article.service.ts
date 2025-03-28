import { ForbiddenException, Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArticleDto } from './article.dto';
import { UserDecorator } from 'src/user/user.decorator';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async getArticleById(articleId: string): Promise<Article | undefined> {
    try {
      const article = await this.prisma.article.findUnique({
        where: {
          id: articleId,
        },
      });

      if (!article) throw new ForbiddenException('No article with this id');
      return article;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  async addArticle(user: any, dto: ArticleDto): Promise<any> {
    try {
      const isRealAuthor = await this.prisma.user.findUnique({
        where: {
          id: user.sub,
        },
      });

      if (!isRealAuthor) throw new ForbiddenException('author not found');

      const res = await this.prisma.article.create({
        data: {
          title: dto.title,
          content: dto.content as string,
          authorId: user.sub,
        },
      });
      const { id, authorId, ...result } = res;
      return result;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  async deleteArticle(user: UserDecorator, articleId: string) {
    try {
      const res = await this.prisma.article.delete({
        where: {
          id: articleId,
          authorId: user.sub,
        },
      });

      if (!res) throw new ForbiddenException('no article with this id');
      return { message: 'article deleted' };
    } catch (err: any) {
      console.error(err);
    }
  }
  async editArticle(user: UserDecorator, articleId: string, dto: ArticleDto) {
    try {
      const res = await this.prisma.article.update({
        where: {
          id: articleId,
          authorId: user.sub,
        },
        data: {
          title: dto.title,
          content: dto.content,
        },
      });

      if (!res) throw new ForbiddenException('no article with this id');
      return { message: 'article updated' };
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }
}
