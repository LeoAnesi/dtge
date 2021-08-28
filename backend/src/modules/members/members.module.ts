import { Module } from '@nestjs/common';
import { HelloAssoModule } from '../helloAsso/helloAsso.module';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

@Module({
  imports: [HelloAssoModule],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
