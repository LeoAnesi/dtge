import { Injectable } from '@nestjs/common';
import { HelloAssoMembershipEntity } from '../helloAsso/helloAsso.membership.entity';
import { HelloAssoService } from '../helloAsso/helloAsso.service';

@Injectable()
export class MembersService {
  constructor(private readonly helloAssoService: HelloAssoService) {}

  getAll(): Promise<HelloAssoMembershipEntity[]> {
    return this.helloAssoService.getMembers();
  }
}
