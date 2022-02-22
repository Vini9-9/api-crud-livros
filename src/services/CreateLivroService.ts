import { ILivrosRepository } from "../repositories/ILivrosRepository";

interface IRequest {
    isbn: string;
    nome: string;
    autor: string;
    descricao?: string;
    estoque: number;
}

class CreateLivroService {

    constructor(private livrosRepository: ILivrosRepository){

    }

    execute({isbn, nome, autor, descricao, estoque}: IRequest): void{
        const isbnJaAssociado = this.livrosRepository.buscaPorIsbn(isbn);
        if(isbnJaAssociado){
            throw new Error("ISBN já está associado a outro livro");
        }

        this.livrosRepository.adiciona({isbn, nome, autor, descricao, estoque });
    }
}

export { CreateLivroService }