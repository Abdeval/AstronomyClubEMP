
import { TaskStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateTaskDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  assignedToId: string;

  @IsString()
  @IsOptional()
  description?: string;
  

  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class UpdateTaskDto {
  
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
  

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsString()
  @IsOptional()
  assignedToId?: string;
}
