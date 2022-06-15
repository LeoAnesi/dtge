import { IsString } from 'class-validator';

export class GenerateResetPasswordLinkDto {
  @IsString()
  readonly userId!: string;
}
