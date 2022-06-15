import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { InscriptionToken } from './entities/inscriptionToken.entity';
import { ResetPasswordToken } from './entities/resetPasswordToken.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, InscriptionToken, ResetPasswordToken]),
    JwtModule.register({
      secretOrKeyProvider: () => {
        const secretKey = process.env.SECRET_KEY;
        if (secretKey === undefined) {
          throw new Error('Secret Key is not defined');
        }

        return secretKey;
      },
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
