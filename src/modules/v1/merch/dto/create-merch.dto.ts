import {
  IsString,
  IsArray,
  ArrayMaxSize,
  IsNumber,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class VariantDto {
  @IsString()
  size: string;

  @IsNumber()
  @Min(0)
  stock: number;
}

export class CreateMerchDto {
  @IsString()
  shopId: string;
  
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  colors: string;

  @IsString()
  merchandiseType: string;

  @IsString()
  sizes: string;

  @IsString()
  quantities: string;
}
