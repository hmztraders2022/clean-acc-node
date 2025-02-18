import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class TambahKolomBirthdate1736417510408 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "user",
            new TableColumn({
                name: "birth_date",
                type: "date",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user', 'birth_date')
    }
}
