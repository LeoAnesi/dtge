import BaseEntity from 'helpers/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('resetPasswordToken')
export class ResetPasswordToken extends BaseEntity {
  @Column({ length: 200 })
  userId!: string;

  @Column()
  token!: string;
}
