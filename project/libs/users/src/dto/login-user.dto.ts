import { Expose } from 'class-transformer';

export class LoginUserDto {
  @Expose()
  public email: string = '';

  @Expose()
  public password: string = '';
}
