import { Module } from '@nestjs/common';
import { HelloAssoModule } from '../helloAsso/helloAsso.module';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';

@Module({
  imports: [HelloAssoModule],
  controllers: [AssociationsController],
  providers: [AssociationsService],
})
export class AssociationsModule {}
