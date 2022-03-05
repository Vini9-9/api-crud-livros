import { Livro } from "../../entities/Livro";
import { ICreateLivroDTO, IPageLivroDTO, ILivrosRepository, IUpdateLivroDTO } from "../ILivrosRepository";


export class LivrosRepositoryInMemory implements ILivrosRepository {
    
    livros: Livro[] = [];
    
    constructor () {
        this.livros = [
            {
                isbn: "0",
                nome: "nome do primeiro Livro",
                autor: "autor do primeiro livro",
                descricao: "descricao do primeiro livro",
                estoque: 100
            },
            {
                isbn: "1",
                nome: "nome do segundo Livro",
                autor: "autor do segundo livro",
                descricao: "descricao do segundo livro",
                estoque: 102
            },
            {
                isbn: "2",
                nome: "nome do terceiro Livro",
                autor: "autor do terceiro livro",
                descricao: "descricao do terceiro livro",
                estoque: 103
            }
        ]
    }


    async adiciona({ isbn, nome, autor, descricao, estoque }: ICreateLivroDTO): Promise<void> {
        
        this.livros.push({
            isbn, nome, autor, descricao, estoque
        })

    }

    async lista(): Promise<Livro[]> {

        const resultados = this.livros
        return resultados

    }

    async pagina({ page, limit }: IPageLivroDTO): Promise<Livro[]> {

        const pageNumber = page > 0 ? page : 1;
        const limitNumber = limit > 0 ? limit : 5;

        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = pageNumber * limitNumber;
        
        const resultadosPaginados = this.livros.slice(startIndex, endIndex)
        
        return resultadosPaginados

    }

    async exibePorPropriedade(livros: Livro[], propriedade: string): Promise<Livro[]> {
        
        function getFields(array: any[], field: string ) {
            return array.map(a => a[field]);
        }

        var livrosPorPropriedade = getFields(livros, propriedade)
    
        return livrosPorPropriedade

    }


    async removePorSbn(isbn: string): Promise<void | Error> {
        this.livros = this.livros.filter(livro => livro.isbn != isbn);
    }

    async limpaRepository(): Promise<void | Error> {
        this.livros = [];
    }

    async atualizaPorIsbn(livro: Livro, { nome, autor, descricao, estoque }: IUpdateLivroDTO): Promise<Livro | object[]> {

        livro.nome = nome ? nome : livro.nome;
        livro.autor = autor ? autor : livro.autor;
        livro.descricao = descricao ? descricao : livro.descricao;
        livro.estoque = estoque ? estoque : livro.estoque;

        return livro;
    }

    async buscaPorIsbn(isbn: string): Promise<Livro | undefined> {
        const livro = this.livros.find((livro) => livro.isbn === isbn);
        return livro;
    }

}