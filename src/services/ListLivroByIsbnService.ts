import { Livro } from "../model/Livro";
import { LivrosRepository } from "../repositories/LivrosRepository";


class ListLivroByIsbnService {

    constructor(private livrosRepository: LivrosRepository){

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