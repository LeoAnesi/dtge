import { Controller, Get } from '@nestjs/common';
import { Public } from 'auth/public.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('health')
  @Public()
  health(): Record<string, unknown> {
    // https://tools.ietf.org/id/draft-inadarei-api-health-check-01.html#rfc.section.3
    return { status: 'pass' };
  }
}
