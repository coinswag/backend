import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  did: string;

  @IsBoolean()
  @IsNotEmpty()
  isNewUser: boolean;

  @IsString()
  pubKey: string;
}
