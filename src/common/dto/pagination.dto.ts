import { Type } from "class-transformer";
import { IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number;

    @IsOptional()
    @IsString()
    @MinLength(1)
    searchTerm?: string
}