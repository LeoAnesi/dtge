import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Crud, CrudController, Override } from '@nestjsx/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from 'auth/role.decorator';
import { RolesGuard } from 'auth/role.guard';
import { Public } from 'auth/public.decorator';
import { GetUserDto } from './interfaces/getUser.dto';
import { CreateUserDto } from './interfaces/createUser.dto';
import { UpdateUserDto } from './interfaces/updateUser.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { GenerateInscriptionLinkDto } from './interfaces/generateInscriptionToken.dto';

@ApiTags('User')
@Crud({
  model: {
    type: User,
  },
  query: {
    exclude: ['password'],
  },
  routes: {
    only: ['getOneBase', 'createOneBase', 'updateOneBase', 'deleteOneBase', 'getManyBase'],
    getOneBase: {
      decorators: [UseGuards(RolesGuard), Roles('admin'), ApiBearerAuth('access-token')],
    },
    deleteOneBase: {
      decorators: [UseGuards(RolesGuard), Roles('admin'), ApiBearerAuth('access-token')],
    },
    updateOneBase: {
      decorators: [UseGuards(RolesGuard), Roles('admin'), ApiBearerAuth('access-token')],
    },
    getManyBase: {
      decorators: [UseGuards(RolesGuard), Roles('admin'), ApiBearerAuth('access-token')],
    },
  },
})
@Controller('users')
export class UserController implements CrudController<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    public readonly service: UserService,
  ) {}

  @Override()
  @Public()
  createOne(@Body() userDto: CreateUserDto): Promise<GetUserDto> {
    return this.service.createUser(userDto);
  }

  @Override()
  @ApiBearerAuth('access-token')
  @UseGuards(RolesGuard)
  @Roles('admin')
  updateOne(@Param('id') userId: string, @Body() userDto: UpdateUserDto): Promise<GetUserDto> {
    return this.service.updateUser(userId, userDto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post('generate-inscription-link')
  async generateInscriptionLink(
    @Body() { association }: GenerateInscriptionLinkDto,
    @Req() req: Request,
  ): Promise<string> {
    const host = (await req.get('host')) as string;

    return this.service.generateInscriptionLink(association, host);
  }

  @Get('me')
  me(@Req() req: Request & { user: User }): User {
    return req.user;
  }
}
