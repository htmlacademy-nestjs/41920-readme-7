import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User login',
    example: 'Keks',
  })
  @IsString({ message: AuthenticationValidateMessage.NameIsNotString })
  @MinLength(6, { message: AuthenticationValidateMessage.LoginMinLength })
  public login: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @MinLength(6, {
    message: AuthenticationValidateMessage.PasswordMinLength,
  })
  @MaxLength(30, {
    message: AuthenticationValidateMessage.PasswordMaxLength,
  })
  public password: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  public avatar?: string;
}
