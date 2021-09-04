import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAssociationToUser1630443177054 implements MigrationInterface {
  name = 'AddAssociationToUser1630443177054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "association" character varying(200)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "association"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(50) NOT NULL`);
  }
}
