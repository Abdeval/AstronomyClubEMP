import { ImageCategory } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";



export class CreateImageDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsEnum(ImageCategory)
  category: ImageCategory;

  @IsOptional()
  @IsString()
  groupId?: string;

  @IsOptional()
  @IsString()
  observationId?: string;

  @IsOptional()
  @IsString()
  eventId?: string;
}