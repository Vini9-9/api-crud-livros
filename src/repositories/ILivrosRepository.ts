import { Livro } from '../entities/Livro'


interface ICreateLivroDTO {
    isbn: string;
    nome: string;
    autor: string;
    descricao?: string;
    estoque: number;
}

interface IListLivroDTO {
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

    lista({page, limit}: IListLivroDTO):Promise<Livro[] | Error>;

    removePorSbn(isbn: string): Promise<void | Error>;

    atualizaPorSbn(livro: Livro, { nome, autor, descricao, estoque}: IUpdateLivroDTO): Promise<Livro | object[]>;

    buscaPorIsbn(isbn: string): Promise<Livro | undefined>;

}

export { ILivrosRepository, ICreateLivroDTO, IListLivroDTO, IUpdateLivroDTO}