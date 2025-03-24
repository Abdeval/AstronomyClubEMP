import { IsNotEmpty, IsString } from 'class-validator';

export class ArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

}
