import {MigrationInterface,Table, QueryRunner} from "typeorm";

export class CreateLivros1646690099506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "livros",
                columns: [
                    {
                        name: "isbn",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true,
                        isPrimary: true
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
                        isNullable: true
                        
                    },
                    {
                        name: "estoque",
                        type: "int",
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("livros");
    }

}
