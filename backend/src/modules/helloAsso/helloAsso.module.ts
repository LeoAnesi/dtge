import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { HelloAssoService } from './helloAsso.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.helloasso.com',
    }),
  ],
  controllers: [],
  providers: [HelloAssoService],
  exports: [HelloAssoService],
})
export class HelloAssoModule {}
