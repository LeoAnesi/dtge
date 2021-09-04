import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'auth/role.decorator';
import { RolesGuard } from 'auth/role.guard';
import { AssociationsService } from './associations.service';

@Controller('associations')
@ApiTags('Associations')
@UseGuards(RolesGuard)
@Roles('admin')
export class AssociationsController {
  constructor(private readonly membersService: AssociationsService) {}

  @Get()
  getAll(): Promise<string[]> {
    return this.membersService.getAll();
  }
}
