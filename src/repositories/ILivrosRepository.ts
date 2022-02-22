import { Livro } from '../model/Livro'


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
    nome?: string;
    autor?: string;
    descricao?: string;
    estoque?: number;
}

interface ILivrosRepository {
    adiciona({isbn, nome, autor, descricao, estoque}: ICreateLivroDTO): void;

    lista({page, limit}: IListLivroDTO): Livro[];

    removePorSbn(isbn: string): Livro[];

    atualizaPorSbn(isbn: string, { nome, autor, descricao, estoque}: IUpdateLivroDTO): Livro[];

    buscaPorIsbn(isbn: string): Livro | undefined;

    setLivros(livros: Livro[]): void;

    getLivros(): Livro[];

}

export { ILivrosRepository, ICreateLivroDTO, IListLivroDTO, IUpdateLivroDTO}