import { Body, Controller, Param, UseGuards } from '@nestjs/common';
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
    only: ['getOneBase', 'createOneBase', 'updateOneBase', 'deleteOneBase'],
    getOneBase: {
      decorators: [ApiBearerAuth('access-token')],
    },
    deleteOneBase: {
      decorators: [ApiBearerAuth('access-token')],
    },
    updateOneBase: {
      decorators: [ApiBearerAuth('access-token')],
    },
  },
})
@Controller('users')
@UseGuards(RolesGuard)
@Roles('admin')
export class UserController implements CrudController<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    public readonly service: UserService,
  ) {}

  @Override()
  @ApiBearerAuth('access-token')
  createOne(@Body() userDto: CreateUserDto): Promise<GetUserDto> {
    return this.service.createUser(userDto);
  }

  @Override()
  @ApiBearerAuth('access-token')
  updateOne(@Param('id') userId: string, @Body() userDto: UpdateUserDto): Promise<GetUserDto> {
    return this.service.updateUser(userId, userDto);
  }
}
