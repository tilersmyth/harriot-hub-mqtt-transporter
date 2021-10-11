import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [
        () => ({
          ENVIRONMENT: process.env.NODE_ENV,
          MQTT_PROTOCOL: process.env.MQTT_PROTOCOL,
          MQTT_HOST: process.env.MQTT_HOST,
          MQTT_PORT: parseInt(process.env.MQTT_PORT, 10),
          REDIS_HOST: process.env.REDIS_HOST,
          REDIS_PORT: parseInt(process.env.REDIS_PORT, 10),
        }),
      ],
      validationSchema: Joi.object().keys({
        NODE_ENV: Joi.string()
          .valid('production', 'development', 'test')
          .required(),
        MQTT_PROTOCOL: Joi.string().required(),
        MQTT_HOST: Joi.string().required(),
        MQTT_PORT: Joi.number().positive().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().positive().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
