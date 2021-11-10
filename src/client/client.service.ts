import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { ConfigService } from '@mqtt-transporter/config/config.service';

import { CLIENT_PROVIDER } from './client.constants';
import { InboundMessageIdentityDeserializer } from './deserializers/inbound-message-identity.deserializer';
import { OutboundResponseIdentitySerializer } from './serializers/outbound-response-identity.serializer';

export const clientProvider = {
  provide: CLIENT_PROVIDER,
  useFactory: (configService: ConfigService) => {
    return ClientProxyFactory.create({
      transport: Transport.MQTT,
      options: {
        url: `mqtt://${configService.MQTT_HOST}:${configService.MQTT_PORT}`,
      },
    });
  },
  inject: [ConfigService],
};
