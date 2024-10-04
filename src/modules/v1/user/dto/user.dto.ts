import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  did: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  pubKey: string;
}

export class UpdateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  did: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  pubKey: string;
}
