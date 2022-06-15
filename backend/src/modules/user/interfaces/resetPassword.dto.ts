import { IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  readonly password!: string;

  @IsString()
  readonly resetPasswordToken!: string;
}
