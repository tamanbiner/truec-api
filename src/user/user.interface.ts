import { IsNumber, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IUser {
  @ApiProperty()
  @IsNumber()
  uid?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email?: string;
}

export interface UserData {
  email: string;
  fullName: string;
}

export interface UserRO {
  user: UserData;
}
