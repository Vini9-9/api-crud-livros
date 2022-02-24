import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLivros1645661098847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Livros",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "isbn",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "autor",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "descricao",
                        type: "varchar",
                        isNullable: false
                        
                    },
                    {
                        name: "estoque",
                        type: "int",
                        isNullable: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Livros");
    }

}
