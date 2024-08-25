import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitRouting } from '@project/shared/core';

import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { rabbitConfig } from '@project/config';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    console.log(dto);
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.AddSubscriber,
      { ...dto },
    );
  }
}
