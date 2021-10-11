import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  MqttContext,
} from '@nestjs/microservices';

import { InputService } from './input.service';

@Controller()
export class InputController {
  logger = new Logger('InputController');

  constructor(private readonly inputService: InputService) {}

  @EventPattern('ping/+')
  nodePing(@Ctx() context: MqttContext) {
    return this.inputService.ping(context);
  }

  @MessagePattern('input/on/+')
  async handleOn(@Ctx() context: MqttContext): Promise<void> {
    return this.inputService.on(context);
  }

  @MessagePattern('input/off/+')
  async handleOff(@Ctx() context: MqttContext): Promise<void> {
    return this.inputService.off(context);
  }

  @MessagePattern('node/+/+')
  async handleNode(@Ctx() context: MqttContext): Promise<void> {
    return this.inputService.activity(context);
  }
}
