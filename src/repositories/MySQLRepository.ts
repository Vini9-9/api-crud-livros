import { Livro } from '../model/Livro'
import { ILivrosRepository, ICreateLivroDTO, IListLivroDTO, IUpdateLivroDTO} from './ILivrosRepository'


class MySQLRepository implements ILivrosRepository{
    
    adiciona({ isbn, nome, autor, descricao, estoque }: ICreateLivroDTO): void {
        throw new Error('Method not implemented.')
    }
    lista({ page, limit }: IListLivroDTO): Livro[] {
        throw new Error('Method not implemented.')
    }
    removePorSbn(isbn: string): Livro[] {
        throw new Error('Method not implemented.')
    }
    atualizaPorSbn(isbn: string, { nome, autor, descricao, estoque }: IUpdateLivroDTO): Livro[] {
        throw new Error('Method not implemented.')
    }
    buscaPorIsbn(isbn: string): Livro {
        throw new Error('Method not implemented.')
    }
    setLivros(livros: Livro[]): void {
        throw new Error('Method not implemented.')
    }
    getLivros(): Livro[] {
        throw new Error('Method not implemented.')
    }

}

export { MySQLRepository }