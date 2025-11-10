import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueuesService } from './queues.service';

@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST'),
          port: parseInt(config.get('REDIS_PORT') || '6379', 10),
        },
      }),
    }),
    // Ejemplo de registro de colas
    BullModule.registerQueue(
      { name: 'emailQueue' },
    ),
  ],
  providers: [QueuesService],
  exports: [QueuesService],
})
export class QueuesModule {}
