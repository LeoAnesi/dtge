import BaseEntity from 'helpers/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 200, nullable: true })
  association!: string;

  @Column({ length: 100, select: false })
  password!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column('simple-array')
  roles!: string[];
}
