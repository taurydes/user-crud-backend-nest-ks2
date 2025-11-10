import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailService } from 'src/email/email.service';

/**
 * Procesador de trabajos de envío de correos
 * Se ejecuta en background al recibir un nuevo job en la cola "emailQueue"
 */
@Processor('emailQueue')
export class EmailProcessor extends WorkerHost {
  constructor(private readonly emailService: EmailService) {
    super();
  }

  /**
   * Ejecuta cada trabajo de envío de correo
   */
  async process(job: Job<any, any, string>) {
    const { type, dto, replacements } = job.data;

    if (type === 'template') {
      await this.emailService.sendEmailWithTemplate(dto, replacements);
    } else {
      await this.emailService.sendEmail(dto);
    }

    return { status: 'ok', jobId: job.id };
  }
}
