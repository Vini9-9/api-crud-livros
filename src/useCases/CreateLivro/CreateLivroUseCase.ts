import { ILivrosRepository } from "../../repositories/ILivrosRepository";

interface IRequest {
    isbn: string;
    nome: string;
    autor: string;
    descricao?: string;
    estoque: number;
}

export class CreateLivroUseCase {

    constructor(private livrosRepository: ILivrosRepository){
        
    }

    async execute({isbn, nome, autor, descricao, estoque}: IRequest): Promise<void | Error>{

        const isbnJaAssociado = await this.livrosRepository.buscaPorIsbn(isbn);

        if(isbnJaAssociado){
            throw new Error("ISBN já está associado a outro livro");
        }

        this.livrosRepository.adiciona({isbn, nome, autor, descricao, estoque });
    }
}