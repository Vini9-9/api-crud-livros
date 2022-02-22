import { ILivrosRepository } from "../repositories/ILivrosRepository";

class DeleteLivroByIsbnService {

    constructor(private livrosRepository: ILivrosRepository){

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