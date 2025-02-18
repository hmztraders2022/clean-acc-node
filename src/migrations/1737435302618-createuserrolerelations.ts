import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Createuserrolerelations1737435302618 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_roles",
                columns: [
                    {
                        name: "userId",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "roleId",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "createdAt",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            })
        )

        // Menambahkan foreign key untuk userId
        await queryRunner.createForeignKey(
            "user_roles",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedTableName: "user",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    
        // Menambahkan foreign key untuk roleId
        await queryRunner.createForeignKey(
            "user_roles",
            new TableForeignKey({
                columnNames: ["roleId"],
                referencedTableName: "roles",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("user_roles");
        const foreignKeys = table.foreignKeys.filter(
        (fk) =>
            fk.columnNames.indexOf("userId") !== -1 ||
            fk.columnNames.indexOf("roleId") !== -1
        );

        await queryRunner.dropForeignKeys("user_roles", foreignKeys);
        await queryRunner.dropTable("user_roles");
    }

}
