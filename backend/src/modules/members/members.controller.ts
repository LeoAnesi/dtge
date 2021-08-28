import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'auth/role.decorator';
import { RolesGuard } from 'auth/role.guard';
import { HelloAssoMembershipEntity } from '../helloAsso/helloAsso.membership.entity';
import { MembersService } from './members.service';

@Controller('members')
@ApiTags('Members')
@UseGuards(RolesGuard)
@Roles('admin')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  getAll(): Promise<HelloAssoMembershipEntity[]> {
    return this.membersService.getAll();
  }
}
