import { Livro } from "../../entities/Livro";
import { ILivrosRepository } from "../../repositories/ILivrosRepository";


export class ListLivroByIsbnUseCase {

    constructor(private livrosRepository: ILivrosRepository){

    }

    async execute(isbn: string): Promise<Livro | Error> {

        const isbnJaAssociado = await this.livrosRepository.buscaPorIsbn(isbn);

        if(!isbnJaAssociado){
            return new Error("ISBN não localizado");
        }

        return isbnJaAssociado;
    }
}
