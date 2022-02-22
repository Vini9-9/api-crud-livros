import { Livro } from '../model/Livro'
import { ILivrosRepository, ICreateLivroDTO, IListLivroDTO, IUpdateLivroDTO} from './ILivrosRepository'


class LivrosRepository implements ILivrosRepository{
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
    }

    lista({page, limit}: IListLivroDTO): Livro[]{
        return this.livros;
    }

    removePorSbn(isbn: string): Livro[]{
        const livroArr = this.livros.filter(livro => livro.isbn != isbn);
        return livroArr
    }

    atualizaPorSbn(isbn: string, { nome, autor, descricao, estoque}: IUpdateLivroDTO): Livro[]{

        const livroArr = this.livros.map(livro => {
            if (livro.isbn === isbn) {
                livro.nome = nome ? nome : livro.nome;
                livro.autor = autor ? autor : livro.autor;
                livro.descricao = descricao ? descricao : livro.descricao;
                livro.estoque = estoque ? estoque : livro.estoque;
              return livro;
            }
          
            return livro;
          });

        return livroArr;
    }

    buscaPorIsbn(isbn: string): Livro | undefined{
        const livro = this.livros.find(livro => livro.isbn === isbn);
        return livro;
    }

    setLivros(livros: Livro[]): void{
        this.livros = livros
    }

}

export { LivrosRepository }