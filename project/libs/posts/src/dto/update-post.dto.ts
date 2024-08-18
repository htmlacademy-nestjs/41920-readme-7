import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PostStatus, PostType } from '@project/shared/core';

export class UpdatePostDto {
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
  public type: PostType = PostType.LINK;

  @IsString()
  @IsNotEmpty()
  public status: PostStatus = PostStatus.DRAFT;

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

  @IsArray()
  public tags: string[] = [];

  @IsUUID('all', { each: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  public likes: string[] = [];

  @IsUUID('all', { each: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  public comments: string[] = [];
}
