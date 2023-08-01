import { MigrationInterface, QueryRunner } from "typeorm";

export class First1690878828225 implements MigrationInterface {
    name = 'First1690878828225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "education" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eduname" character varying NOT NULL, "percentage" character varying NOT NULL, "course" character varying NOT NULL, "duration" character varying NOT NULL, "employeeId" uuid, CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_experience" ("id" SERIAL NOT NULL, "workexpname" character varying NOT NULL, "role" character varying NOT NULL, "duration" character varying NOT NULL, "technology" character varying NOT NULL, "description" character varying NOT NULL, "employeeId" uuid, CONSTRAINT "PK_d4bef63ad6da7ec327515c121bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "base_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "craetedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_03e6c58047b7a4b3f6de0bfa8d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "craetedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "companyname" character varying NOT NULL, "position" character varying NOT NULL, "description" character varying NOT NULL, "phone" character varying NOT NULL, "yearofexp" character varying NOT NULL, "technology" character varying NOT NULL, "employeeId" uuid, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "craetedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "projectname" character varying NOT NULL, "duration" character varying NOT NULL, "description" character varying NOT NULL, "links" character varying NOT NULL, "technology" character varying NOT NULL, "employeeId" uuid, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "signup" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_c110dfad84ad520e86d4202eff5" UNIQUE ("email"), CONSTRAINT "PK_ac9abc3369438f36bac2e0986e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_5fc2421e51afb417f8d32a8154e" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_experience" ADD CONSTRAINT "FK_560b6caded50a69bb1be6481893" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_79ff2b8fa4129034e76d221dc01" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_9740c47962fbd4526fc815383b3" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_9740c47962fbd4526fc815383b3"`);
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_79ff2b8fa4129034e76d221dc01"`);
        await queryRunner.query(`ALTER TABLE "work_experience" DROP CONSTRAINT "FK_560b6caded50a69bb1be6481893"`);
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_5fc2421e51afb417f8d32a8154e"`);
        await queryRunner.query(`DROP TABLE "signup"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "job"`);
        await queryRunner.query(`DROP TABLE "base_entity"`);
        await queryRunner.query(`DROP TABLE "work_experience"`);
        await queryRunner.query(`DROP TABLE "education"`);
    }

}
