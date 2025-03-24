import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ArticleDto {
    // @IsString()
    // @IsNotEmpty()
    // id: string;
    
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsOptional()
    @IsString()
    content?: string;
    
    @IsString()
    authorId: string;
}