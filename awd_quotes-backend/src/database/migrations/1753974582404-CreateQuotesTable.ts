import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateQuotesTable1753974582404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "quotes" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "text" VARCHAR NOT NULL,
                "author" VARCHAR,
                "authorslug" VARCHAR
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "quotes"`);
  }
}
