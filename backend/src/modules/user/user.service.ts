import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './interfaces/createUser.dto';
import { UpdateUserDto } from './interfaces/updateUser.dto';
import { GetUserDto } from './interfaces/getUser.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super(userRepository);
  }

  private hashPassword = async (password: string) => {
    return await hash(password, SALT_ROUNDS);
  };

  getUser = async (userId: string): Promise<GetUserDto> => {
    return await this.userRepository.findOneOrFail(userId);
  };

  createUser = async (userDto: CreateUserDto): Promise<GetUserDto> => {
    const hashedPassword = await this.hashPassword(userDto.password);
    const { id: userId } = await this.userRepository.save({
      ...userDto,
      password: hashedPassword,
    });

    return await this.getUser(userId);
  };

  updateUser = async (userId: string, userDto: UpdateUserDto): Promise<GetUserDto> => {
    await this.userRepository.findOneOrFail({ id: userId });
    let user = userDto;

    if (userDto.password !== undefined) {
      const hashedPassword = await this.hashPassword(userDto.password);
      user = { ...user, password: hashedPassword };
    }

    await this.userRepository.save({ ...user, id: userId });

    return await this.getUser(userId);
  };
}
