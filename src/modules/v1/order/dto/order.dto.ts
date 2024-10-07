import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsMongoId,
  IsBoolean,
  IsEnum,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PriceBreakdownDto {
  @IsNumber()
  @IsNotEmpty()
  subtotal: number;

  @IsNumber()
  @IsNotEmpty()
  tax: number;

  @IsNumber()
  @IsNotEmpty()
  shippingCost: number;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @IsNumber()
  @IsNotEmpty()
  total: number;
}

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

export class ShippingInfoDto {
  @ValidateNested()
  @Type(() => AddressDto)
  @IsNotEmpty()
  address: AddressDto;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsString()
  @IsOptional()
  trackingNumber?: string;
}
export class CustomerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}

export class CreateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  shopId: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsString()
  @IsNotEmpty()
  txHash: string;

  @ValidateNested()
  @Type(() => CustomerDto)
  @IsNotEmpty()
  customer: CustomerDto;

  @ValidateNested()
  @Type(() => ShippingInfoDto)
  @IsNotEmpty()
  shippingInfo: ShippingInfoDto;

  @ValidateNested()
  @Type(() => PriceBreakdownDto)
  @IsNotEmpty()
  priceBreakdown: PriceBreakdownDto;

  @IsNotEmpty()
  @IsArray()
  cart: ItemDto[];
}

export class ItemDto {
  @IsString()
  @IsNotEmpty()
  merch: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
