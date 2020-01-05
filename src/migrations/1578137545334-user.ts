import {MigrationInterface, QueryRunner} from "typeorm";

export class user1578137545334 implements MigrationInterface {
    name = 'user1578137545334'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL DEFAULT 'NULL', "fullName" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "unique_user_email" UNIQUE ("email"), CONSTRAINT "PK_df955cae05f17b2bcf5045cc021" PRIMARY KEY ("uid"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
