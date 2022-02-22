import { LivrosRepository } from "../repositories/LivrosRepository";

interface IRequest {
    nome?: string;
    autor?: string;
    descricao?: string;
    estoque?: number;
}

class UpdateLivroByIsbnService {

    constructor(private livrosRepository: LivrosRepository){

    }

    execute(isbn: string, { nome, autor, descricao, estoque}: IRequest): void{
        const isbnJaAssociado = this.livrosRepository.buscaPorIsbn(isbn);
        if(!isbnJaAssociado){
            throw new Error("ISBN não localizado");
        }

        const livrosEstoque = this.livrosRepository.atualizaPorSbn(isbn, { nome, autor, descricao, estoque});
        this.livrosRepository.setLivros(livrosEstoque);
    }
}

export { UpdateLivroByIsbnService }