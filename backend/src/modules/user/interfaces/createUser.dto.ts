import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly association!: string;

  @IsString()
  readonly email!: string;

  @IsString()
  readonly password!: string;

  @IsOptional()
  @IsString({ each: true })
  readonly roles?: string[];
}
