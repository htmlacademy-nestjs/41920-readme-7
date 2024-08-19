import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { CommentValidateMessage } from '../comment.constant';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: CommentValidateMessage.MessageIsEmpty })
  public message: string = '';

  @IsString()
  @IsMongoId({ message: CommentValidateMessage.InvalidID })
  public userId: string = '';

  @IsString()
  @IsNotEmpty()
  public postId: string = '';
}
