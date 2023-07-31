import { MigrationInterface, QueryRunner } from "typeorm";

export class First1690787135127 implements MigrationInterface {
    name = 'First1690787135127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "signup" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_ac9abc3369438f36bac2e0986e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "signup"`);
    }

}
