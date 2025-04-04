import { ForbiddenException, Injectable } from '@nestjs/common';
// import { Article } from 'shared-types';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddArticleDto, UpdateArticleDto } from './article.dto';
import { UserDecorator } from 'src/user/user.decorator';
import { Article } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async getArticleById(articleId: string): Promise<Article | undefined> {
    try {
      const article = await this.prisma.article.findUnique({
        where: {
          id: articleId,
        },
        include: {
          author: true
        }
      });

      if (!article) throw new ForbiddenException('No article with this id');
      return article;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  async getAllArticles(): Promise<Article[] | undefined> {
    try {
      const articles = await this.prisma.article.findMany({
        include: {
          author: true
        }
      });

      if (!articles) throw new ForbiddenException('No article with this id');
      return articles;
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  async addArticle(dto: AddArticleDto, file: Express.Multer.File, userId?: string): Promise<any> {
    try {
      const isRealAuthor = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!isRealAuthor) throw new ForbiddenException('author not found');
      const filename = file.filename;
      const baseUrl = process.env.API_URL || "http://localhost:3000";
      const url = `${baseUrl}/uploads/${filename}`;
      const res = await this.prisma.article.create({
        data: {
          title: dto.title,
          content: dto.content as string,
          authorId: userId as string,
          image: url,
          category: dto.category
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

  
  async updateArticle(user: UserDecorator, articleId: string, dto: UpdateArticleDto) {
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
