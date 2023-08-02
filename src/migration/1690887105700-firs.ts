import { MigrationInterface, QueryRunner } from "typeorm";

export class Firs1690887105700 implements MigrationInterface {
    name = 'Firs1690887105700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_experience" DROP CONSTRAINT "PK_d4bef63ad6da7ec327515c121bd"`);
        await queryRunner.query(`ALTER TABLE "work_experience" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "work_experience" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "work_experience" ADD CONSTRAINT "PK_d4bef63ad6da7ec327515c121bd" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_experience" DROP CONSTRAINT "PK_d4bef63ad6da7ec327515c121bd"`);
        await queryRunner.query(`ALTER TABLE "work_experience" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "work_experience" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_experience" ADD CONSTRAINT "PK_d4bef63ad6da7ec327515c121bd" PRIMARY KEY ("id")`);
    }

}
