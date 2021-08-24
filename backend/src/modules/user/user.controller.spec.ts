import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnection, Repository } from 'typeorm';

import { UserController } from './user.controller';
import { CreateUserDto } from './interfaces/createUser.dto';
import { UpdateUserDto } from './interfaces/updateUser.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

const USER_1: CreateUserDto = {
  name: 'name1',
  email: 'email1',
  password: 'password1',
  roles: ['user'],
};
const USER_2: UpdateUserDto = {
  name: 'name2',
  email: 'email2',
  password: 'password2',
  roles: ['admin'],
};

describe('UserController', () => {
  let userController: UserController;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User])],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = app.get<UserController>(UserController);
    userRepository = app.get<Repository<User>>(getRepositoryToken(User));
    await userRepository.clear();
  });

  afterEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  describe('user', () => {
    it('should create a user', async () => {
      const createdUser = await userController.createOne(USER_1);
      const createdUserId = createdUser.id.toString();
      // Extracting password is needed to match what is really happenning
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...storedUserWithoutPassword } = await userRepository.findOneOrFail(
        createdUserId,
      );
      expect(storedUserWithoutPassword).toEqual(createdUser);
    });

    it('should update a user', async () => {
      const { id: createdUserId } = await userRepository.save(USER_1);
      const updatedUser = await userController.updateOne(createdUserId, USER_2);
      expect(await userRepository.findOne(createdUserId)).toEqual(updatedUser);
    });
  });
});
