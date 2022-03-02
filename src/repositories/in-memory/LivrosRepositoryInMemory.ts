import { Livro } from "../../entities/Livro";
import { ICreateLivroDTO, IPageLivroDTO, ILivrosRepository, IUpdateLivroDTO } from "../ILivrosRepository";


export class LivrosRepositoryInMemory implements ILivrosRepository {

    livros: Livro[] = [];

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

        const pageNumber = page ? page : 1;
        const limitNumber = limit ? limit : 5;

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
        this.livros.filter(livro => livro.isbn != isbn);
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