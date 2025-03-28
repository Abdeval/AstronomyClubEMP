import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;
  // Todo: there is more to add
}
