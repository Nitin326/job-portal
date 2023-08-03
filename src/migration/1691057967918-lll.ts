import { MigrationInterface, QueryRunner } from "typeorm";

export class Lll1691057967918 implements MigrationInterface {
    name = 'Lll1691057967918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "education" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eduname" character varying NOT NULL, "percentage" character varying NOT NULL, "course" character varying NOT NULL, "duration" character varying NOT NULL, "employeeId" uuid, CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_experience" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "workexpname" character varying NOT NULL, "role" character varying NOT NULL, "duration" character varying NOT NULL, "technology" character varying NOT NULL, "description" character varying NOT NULL, "employeeId" uuid, CONSTRAINT "PK_d4bef63ad6da7ec327515c121bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "projectname" character varying NOT NULL, "duration" character varying NOT NULL, "description" character varying NOT NULL, "links" character varying NOT NULL, "technology" character varying NOT NULL, "employeeId" uuid, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "base_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "craetedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_03e6c58047b7a4b3f6de0bfa8d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "craetedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "companyname" character varying NOT NULL, "position" character varying NOT NULL, "description" character varying NOT NULL, "phone" character varying NOT NULL, "yearofexp" character varying NOT NULL, "technology" character varying NOT NULL, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "craetedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_application" ("id" SERIAL NOT NULL, "accepted" boolean NOT NULL DEFAULT false, "employeeId" uuid, "jobId" uuid, CONSTRAINT "PK_c0b8f6b6341802967369b5d70f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resume" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "resume" character varying NOT NULL, "employeeId" character varying NOT NULL, CONSTRAINT "PK_7ff05ea7599e13fac01ac812e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_job" ("employeeId" uuid NOT NULL, "jobId" uuid NOT NULL, CONSTRAINT "PK_46912908228ebaf811635ed5859" PRIMARY KEY ("employeeId", "jobId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e4b9bed2fb3d5d9705fbebef4e" ON "employee_job" ("employeeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8f4e1c70bdd664752f31044536" ON "employee_job" ("jobId") `);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_5fc2421e51afb417f8d32a8154e" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_experience" ADD CONSTRAINT "FK_560b6caded50a69bb1be6481893" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_9740c47962fbd4526fc815383b3" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD CONSTRAINT "FK_4f23f799b38d6faca3935a77775" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD CONSTRAINT "FK_d0452612ad9cb0e20f6f320ebc0" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_job" ADD CONSTRAINT "FK_e4b9bed2fb3d5d9705fbebef4e8" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_job" ADD CONSTRAINT "FK_8f4e1c70bdd664752f310445361" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_job" DROP CONSTRAINT "FK_8f4e1c70bdd664752f310445361"`);
        await queryRunner.query(`ALTER TABLE "employee_job" DROP CONSTRAINT "FK_e4b9bed2fb3d5d9705fbebef4e8"`);
        await queryRunner.query(`ALTER TABLE "job_application" DROP CONSTRAINT "FK_d0452612ad9cb0e20f6f320ebc0"`);
        await queryRunner.query(`ALTER TABLE "job_application" DROP CONSTRAINT "FK_4f23f799b38d6faca3935a77775"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_9740c47962fbd4526fc815383b3"`);
        await queryRunner.query(`ALTER TABLE "work_experience" DROP CONSTRAINT "FK_560b6caded50a69bb1be6481893"`);
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_5fc2421e51afb417f8d32a8154e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8f4e1c70bdd664752f31044536"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e4b9bed2fb3d5d9705fbebef4e"`);
        await queryRunner.query(`DROP TABLE "employee_job"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "resume"`);
        await queryRunner.query(`DROP TABLE "job_application"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "job"`);
        await queryRunner.query(`DROP TABLE "base_entity"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "work_experience"`);
        await queryRunner.query(`DROP TABLE "education"`);
    }

}
