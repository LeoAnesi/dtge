import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResetPassword1655301558618 implements MigrationInterface {
  name = 'AddResetPassword1655301558618';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "resetPasswordToken" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" character varying(200) NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_be3bedae1bb733f73acfe3d5481" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "resetPasswordToken"`);
  }
}
