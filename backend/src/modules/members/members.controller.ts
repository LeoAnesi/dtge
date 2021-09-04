import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { MemberDto } from './member.dto';
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
}
