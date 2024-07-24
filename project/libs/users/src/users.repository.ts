import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { UsersEntity } from './users.entity';
import { UsersFactory } from './users.factory';
import { BaseMongoRepository } from '../../shared/data-access/src/repository/base-mongo-repository';
import { UsersModel } from './users.model';

@Injectable()
export class UsersRepository extends BaseMongoRepository<UsersEntity, UsersModel> {
  constructor(
    entityFactory: UsersFactory,
    @InjectModel(UsersModel.name) userModel: Model<UsersModel>,
  ) {
    super(entityFactory, userModel);
  }

  public async findByEmail(email: string): Promise<UsersEntity | null> {
    const document = await this.model.findOne({ email }).exec();
    return this.createEntityFromDocument(document);
  }
}
