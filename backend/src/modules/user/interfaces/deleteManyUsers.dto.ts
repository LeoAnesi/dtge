import { IsString } from 'class-validator';

export class DeleteManyUsersDto {
  @IsString({ each: true })
  readonly userIds!: string[];
}
