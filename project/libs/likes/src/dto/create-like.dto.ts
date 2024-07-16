import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeDto {
  @IsString()
  @IsNotEmpty()
  public postId: string = '';

  @IsString()
  @IsNotEmpty()
  public userId: string = '';
}
