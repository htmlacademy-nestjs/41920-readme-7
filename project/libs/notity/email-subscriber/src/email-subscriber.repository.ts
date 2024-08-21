import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { EmailSubscriberModel } from './email-subscriber.model';
import { BaseMongoRepository } from '../../../shared/data-access/src/repository/base-mongo-repository';

@Injectable()
export class EmailSubscriberRepository extends BaseMongoRepository<
  EmailSubscriberEntity,
  EmailSubscriberModel
> {
  constructor(
    entityFactory: EmailSubscriberFactory,
    @InjectModel(EmailSubscriberModel.name)
    emailSubscriberModel: Model<EmailSubscriberModel>,
  ) {
    super(entityFactory, emailSubscriberModel);
  }

  public async findByEmail(email: string): Promise<EmailSubscriberEntity | null> {
    const document = await this.model.findOne({ email }).exec();
    return this.createEntityFromDocument(document);
  }
}
