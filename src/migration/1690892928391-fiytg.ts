import { MigrationInterface, QueryRunner } from "typeorm";

export class Fiytg1690892928391 implements MigrationInterface {
    name = 'Fiytg1690892928391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_79ff2b8fa4129034e76d221dc01"`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "employeeId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" ADD "employeeId" uuid`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_79ff2b8fa4129034e76d221dc01" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
