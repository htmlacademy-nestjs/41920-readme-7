import { Expose } from 'class-transformer';

export class CreateUserDto {
  @Expose()
  public email: string = '';

  @Expose()
  public dateBirth: string = '';

  @Expose()
  public firstname: string = '';

  @Expose()
  public lastname: string = '';

  @Expose()
  public password: string = '';
}
