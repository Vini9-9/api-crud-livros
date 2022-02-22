import { LivrosRepository } from "../repositories/LivrosRepository";

class DeleteLivroByIsbnService {

    constructor(private livrosRepository: LivrosRepository){

    }

    execute(isbn: string): void{
        const isbnJaAssociado = this.livrosRepository.buscaPorIsbn(isbn);
        if(!isbnJaAssociado){
            throw new Error("ISBN não localizado");
        }

        const livrosEstoque = this.livrosRepository.removePorSbn(isbn);
        this.livrosRepository.setLivros(livrosEstoque);
    }
}

export { DeleteLivroByIsbnService }