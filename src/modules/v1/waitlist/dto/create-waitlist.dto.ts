import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateWaitlistDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
