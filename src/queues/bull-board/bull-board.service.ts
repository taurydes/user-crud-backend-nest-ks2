import { Injectable } from '@nestjs/common';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { QueuesService } from '../queues.service';

@Injectable()
export class BullBoardService {
  public readonly serverAdapter = new ExpressAdapter();

  constructor(private readonly queuesService: QueuesService) {
    this.serverAdapter.setBasePath('/admin/queues');
    createBullBoard({
      queues: this.queuesService.getBullAdapters(),
      serverAdapter: this.serverAdapter,
    });
  }
}
