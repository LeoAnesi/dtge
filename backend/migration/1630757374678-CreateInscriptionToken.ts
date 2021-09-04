import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInscriptionToken1630757374678 implements MigrationInterface {
  name = 'CreateInscriptionToken1630757374678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "inscriptionToken" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "association" character varying(200), "token" character varying NOT NULL, CONSTRAINT "PK_91848ae358c47b01da76227df42" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "inscriptionToken"`);
  }
}
