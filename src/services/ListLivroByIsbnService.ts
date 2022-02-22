import { Livro } from "../model/Livro";
import { ILivrosRepository } from "../repositories/ILivrosRepository";


class ListLivroByIsbnService {

    constructor(private livrosRepository: ILivrosRepository){

    }

    execute(isbn: string): Livro | undefined {

        const isbnJaAssociado = this.livrosRepository.buscaPorIsbn(isbn);

        if(!isbnJaAssociado){
            throw new Error("ISBN não localizado");
        }

        return this.livrosRepository.buscaPorIsbn(isbn);
    }
}

export { ListLivroByIsbnService }