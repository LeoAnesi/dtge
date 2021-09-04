import { BadRequestException, Body, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Crud, CrudController, Override } from '@nestjsx/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from 'auth/role.decorator';
import { RolesGuard } from 'auth/role.guard';
import { GetUserDto } from './interfaces/getUser.dto';
import { CreateUserDto } from './interfaces/createUser.dto';
import { UpdateUserDto } from './interfaces/updateUser.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

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
  @ApiBearerAuth('access-token')
  @UseGuards(RolesGuard)
  @Roles('admin')
  createOne(@Body() userDto: CreateUserDto): Promise<GetUserDto> {
    if (userDto.association === '' || userDto.email === '' || userDto.password === '') {
      throw new BadRequestException();
    }

    return this.service.createUser(userDto);
  }

  @Override()
  @ApiBearerAuth('access-token')
  @UseGuards(RolesGuard)
  @Roles('admin')
  updateOne(@Param('id') userId: string, @Body() userDto: UpdateUserDto): Promise<GetUserDto> {
    return this.service.updateUser(userId, userDto);
  }

  @Get('me')
  me(@Req() req: Request & { user: User }): User {
    return req.user;
  }
}
