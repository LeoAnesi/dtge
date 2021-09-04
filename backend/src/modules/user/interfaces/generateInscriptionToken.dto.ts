import { IsString } from 'class-validator';

export class GenerateInscriptionLinkDto {
  @IsString()
  readonly association!: string;
}
