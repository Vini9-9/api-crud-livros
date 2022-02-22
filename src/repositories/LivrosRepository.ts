import { Livro } from '../model/Livro'


interface ICreateLivroDTO {
    isbn: string;
    nome: string;
    autor: string;
    descricao?: string;
    estoque: number;
}

class LivrosRepository {
    private livros: Livro[];

    constructor(){
        this.livros = []
    }
    
    adiciona({isbn, nome, autor, descricao, estoque}: ICreateLivroDTO): void{
        const livro = new Livro();

        Object.assign(livro, {
            isbn, nome, autor, descricao, estoque
        })

        this.livros.push(livro)
        console.log("Livros:",this.livros)
    }

    lista(page, limit): Livro[]{
        return this.livros;
    }

    removePorSbn(isbn: string){}

    atualizaPorSbn(isbn: string, livro){}

    buscaPorIsbn(isbn: string): Livro | undefined{
        const livro = this.livros.find(livro => livro.isbn === isbn);
        return livro;
    }

}

export { LivrosRepository }