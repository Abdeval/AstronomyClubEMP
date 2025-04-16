import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddObservatioDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    date: Date;

    @IsString()
    @IsOptional()
    details?: string;

    @IsString()
    @IsOptional()
    location?: string;
}

export class UpdateObservationDto extends PartialType(AddObservatioDto) {}