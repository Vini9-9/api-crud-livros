import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("livros")
class Livro {
    @PrimaryColumn()
    isbn?: string;

    @Column()
    nome?: string;

    @Column()
    autor?: string;

    @Column()
    descricao?: string;

    @Column()
    estoque?: number;


    constructor(){

    }

}

export { Livro };