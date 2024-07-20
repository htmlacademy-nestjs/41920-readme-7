import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  public postId: string = '';

  @IsString()
  @IsNotEmpty()
  public title: string = '';
}
