import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";

export class PaginationDto {

    @ApiProperty({
        required: false,
        type: Number,
        description: 'Número de registros a mostrar por página',
        default: 10
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({
        required: false,
        type: Number,
        description: 'Número de página a mostrar',
        default: 0
    })
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number;

    @ApiProperty({
        required: false,
        type: String,
        description: 'Término de búsqueda'
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    searchTerm?: string
}