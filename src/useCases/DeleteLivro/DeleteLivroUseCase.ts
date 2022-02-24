import { ILivrosRepository } from "../../repositories/ILivrosRepository";

export class DeleteLivroUseCase {

    constructor(private livrosRepository: ILivrosRepository){

    }

    async execute(isbn: string): Promise<void | Error>{
        const isbnJaAssociado = await this.livrosRepository.buscaPorIsbn(isbn);
        if(!isbnJaAssociado){
            return new Error("ISBN não localizado");
        }

        this.livrosRepository.removePorSbn(isbn);
    }
}
