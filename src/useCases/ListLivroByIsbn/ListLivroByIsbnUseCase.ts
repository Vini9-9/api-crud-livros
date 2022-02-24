import { Livro } from "../../entities/Livro";
import { ILivrosRepository } from "../../repositories/ILivrosRepository";


export class ListLivroByIsbnUseCase {

    constructor(private livrosRepository: ILivrosRepository){

    }

    async execute(isbn: string): Promise<Livro | undefined> {

        const isbnJaAssociado = await this.livrosRepository.buscaPorIsbn(isbn);

        if(!isbnJaAssociado){
            throw new Error("ISBN não localizado");
        }

        return isbnJaAssociado;
    }
}
