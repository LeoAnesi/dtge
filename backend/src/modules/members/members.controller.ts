import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { MemberDto } from './dtos/member.dto';
import { StatsDto } from './dtos/stats';
import { MembersService } from './members.service';

@Controller('members')
@ApiTags('Members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  getAll(@Req() req: Request & { user: User }): Promise<MemberDto[]> {
    return this.membersService.getAll(
      !req.user.roles.includes('admin') ? req.user.association : undefined,
    );
  }

  @Get('stats')
  getStats(): Promise<StatsDto> {
    return this.membersService.getStats();
  }
}
