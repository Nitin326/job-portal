import { MigrationInterface, QueryRunner } from "typeorm";

export class L1691061166716 implements MigrationInterface {
    name = 'L1691061166716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_job" DROP CONSTRAINT "FK_8f4e1c70bdd664752f310445361"`);
        await queryRunner.query(`ALTER TABLE "employee_job" DROP CONSTRAINT "FK_e4b9bed2fb3d5d9705fbebef4e8"`);
        await queryRunner.query(`ALTER TABLE "job_application" DROP CONSTRAINT "PK_c0b8f6b6341802967369b5d70f5"`);
        await queryRunner.query(`ALTER TABLE "job_application" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD CONSTRAINT "PK_c0b8f6b6341802967369b5d70f5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "employee_job" ADD CONSTRAINT "FK_8f4e1c70bdd664752f310445361" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_job" ADD CONSTRAINT "FK_e4b9bed2fb3d5d9705fbebef4e8" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_job" DROP CONSTRAINT "FK_e4b9bed2fb3d5d9705fbebef4e8"`);
        await queryRunner.query(`ALTER TABLE "employee_job" DROP CONSTRAINT "FK_8f4e1c70bdd664752f310445361"`);
        await queryRunner.query(`ALTER TABLE "job_application" DROP CONSTRAINT "PK_c0b8f6b6341802967369b5d70f5"`);
        await queryRunner.query(`ALTER TABLE "job_application" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD CONSTRAINT "PK_c0b8f6b6341802967369b5d70f5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "employee_job" ADD CONSTRAINT "FK_e4b9bed2fb3d5d9705fbebef4e8" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_job" ADD CONSTRAINT "FK_8f4e1c70bdd664752f310445361" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
