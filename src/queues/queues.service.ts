import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class QueuesService {
  constructor(
    @InjectQueue('emailQueue') private emailQueue: Queue,
  ) {}

  getBullAdapters() {
    return [
      new BullMQAdapter(this.emailQueue),
    ];
  }
}
