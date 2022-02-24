import { ILivrosRepository } from "../../repositories/ILivrosRepository";

interface IRequest {
    nome?: string;
    autor?: string;
    descricao?: string;
    estoque?: number;
}

export class UpdateLivroUseCase {

    constructor(private livrosRepository: ILivrosRepository){

    }

    async execute(isbn: string, { nome, autor, descricao, estoque}: IRequest): Promise<void | Error>{
        const isbnJaAssociado = await this.livrosRepository.buscaPorIsbn(isbn);
        if(!isbnJaAssociado){
            throw new Error("ISBN não localizado");
        }

        const livrosEstoque = this.livrosRepository.atualizaPorSbn(isbnJaAssociado, { nome, autor, descricao, estoque});
    }
}
