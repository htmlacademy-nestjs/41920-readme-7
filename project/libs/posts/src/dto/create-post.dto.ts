import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { PostStatus, PostType } from '@project/shared/core';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  public title: string = '';

  @IsString()
  public videoLink?: string;

  @IsString()
  public description?: string;

  @IsString()
  public postText?: string;

  @IsString()
  @IsNotEmpty()
  public userId: string = '';

  @IsString()
  @IsNotEmpty()
  public type: PostType = PostType.Text;

  @IsString()
  @IsNotEmpty()
  public status: PostStatus = PostStatus.Draft;

  @IsString()
  public announce?: string;

  @IsString()
  public link?: string;

  @IsString()
  public photoLink?: string;

  @IsString()
  public quoteText?: string;

  @IsString()
  public quoteAuthor?: string;

  @IsUUID('all', { each: true })
  @IsArray()
  @ArrayNotEmpty()
  public tags: string[] = [];
}