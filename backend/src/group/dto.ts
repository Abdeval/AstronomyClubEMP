import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GroupDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string 

    // Todo: there is more to add
}