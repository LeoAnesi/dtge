import { Injectable } from '@nestjs/common';
import { HelloAssoService } from '../helloAsso/helloAsso.service';

@Injectable()
export class AssociationsService {
  constructor(private readonly helloAssoService: HelloAssoService) {}

  getAll(): Promise<string[]> {
    return this.helloAssoService.getAssociations();
  }
}
