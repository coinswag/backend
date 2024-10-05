import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsNumber,
  ValidateNested,
  ArrayMaxSize,
  MaxLength,
  Min,
} from 'class-validator';

class VariantDto {
  @IsString()
  size: string;

  @IsNumber()
  @Min(0)
  stock: number;
}

export class CreateMerchDto {
  @IsString()
  name: string;

  @IsString()
  @MaxLength(500)
  description: string;

  @IsArray()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  images: string[];

  @IsArray()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  colors: string[];

  @IsString()
  merchandiseType: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variants: VariantDto[];
}
