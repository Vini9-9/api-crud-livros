import { Repository } from 'typeorm'
import { Livro } from '../entities/Livro'


interface ICreateLivroDTO {
    isbn: string;
    nome: string;
    autor: string;
    descricao?: string;
    estoque: number;
}

interface IPageLivroDTO {
    page: number;
    limit: number;
}

interface IUpdateLivroDTO {
    isbn?: string;
    nome?: string;
    autor?: string;
    descricao?: string;
    estoque?: number;
}

interface ILivrosRepository {
    adiciona({isbn, nome, autor, descricao, estoque}: ICreateLivroDTO): Promise<void>;

    lista():Promise<Livro[]>;

    pagina({ page, limit}: IPageLivroDTO):Promise<Livro[]>;

    exibePorPropriedade(livros:Livro[] , propriedade:string ): Promise<Livro[]>;

    removePorSbn(isbn: string): Promise<void | Error>;

    atualizaPorIsbn(livro: Livro, { nome, autor, descricao, estoque}: IUpdateLivroDTO): Promise<Livro | object[]>;

    buscaPorIsbn(isbn: string): Promise<Livro | undefined>;

}

export { ILivrosRepository, ICreateLivroDTO, IPageLivroDTO, IUpdateLivroDTO}