import BaseEntity from 'helpers/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('inscriptionToken')
export class InscriptionToken extends BaseEntity {
  @Column({ length: 200, nullable: true })
  association!: string;

  @Column()
  token!: string;
}
