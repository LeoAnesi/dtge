import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, In, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import * as querystring from 'querystring';
import { JsonWebTokenError } from 'jsonwebtoken';

import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './interfaces/createUser.dto';
import { UpdateUserDto } from './interfaces/updateUser.dto';
import { GetUserDto } from './interfaces/getUser.dto';
import { InscriptionToken } from './entities/inscriptionToken.entity';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(InscriptionToken)
    private readonly inscriptionTokenRepository: Repository<InscriptionToken>,
    private readonly jwtService: JwtService,
  ) {
    super(userRepository);
  }

  private hashPassword = async (password: string) => {
    return await hash(password, SALT_ROUNDS);
  };

  getUser = async (userId: string): Promise<GetUserDto> => {
    return await this.userRepository.findOneOrFail(userId);
  };

  createUser = async ({ inscriptionToken, ...user }: CreateUserDto): Promise<GetUserDto> => {
    try {
      this.jwtService.verify(inscriptionToken);
      const { association } = await this.inscriptionTokenRepository.findOneOrFail({
        token: inscriptionToken,
      });

      const hashedPassword = await this.hashPassword(user.password);
      const { id: userId } = await this.userRepository.save({
        ...user,
        association,
        password: hashedPassword,
        roles: [],
      });

      return await this.getUser(userId);
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException('Invalid Inscription Token');
      }
      if (error instanceof EntityNotFoundError) {
        throw new BadRequestException('Inscription token not found');
      }

      throw error;
    }
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

  async generateInscriptionLink(association: string, host: string): Promise<string> {
    const inscriptionToken = this.jwtService.sign(
      { date: new Date() },
      { expiresIn: 60 * 60 * 24 * 7 },
    );
    this.inscriptionTokenRepository.save({ association, token: inscriptionToken });
    const params = querystring.stringify({ inscriptionToken, association });

    return `https://${host}/register?${params}`;
  }

  deleteMany(userIds: string[]) {
    this.userRepository.delete({ id: In(userIds) });
  }
}
