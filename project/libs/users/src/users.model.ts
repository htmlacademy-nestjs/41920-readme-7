import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser } from '@project/types';

@Schema({
  collection: 'accounts',
  timestamps: true,
})
export class UsersModel extends Document implements AuthUser {
  @Prop({
    required: true,
  })
  public dateOfBirth: Date = new Date();

  @Prop({
    required: true,
    unique: true,
  })
  public email: string = '';

  @Prop({
    required: true,
  })
  public firstname: string = '';

  @Prop({
    required: true,
  })
  public lastname: string = '';

  @Prop({
    required: true,
  })
  public passwordHash: string = '';
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);
