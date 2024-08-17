import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser } from '@project/types';

@Schema({
  collection: 'accounts',
  timestamps: true,
})
export class UsersModel extends Document implements AuthUser {
  @Prop()
  public avatar?: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string = '';

  @Prop({
    required: true,
  })
  public login: string = '';

  @Prop({
    required: true,
  })
  public passwordHash: string = '';
}

export const UsersSchema = SchemaFactory.createForClass(UsersModel);
