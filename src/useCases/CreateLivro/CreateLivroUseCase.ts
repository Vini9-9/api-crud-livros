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

    async execute({isbn, nome, autor, descricao, estoque}: IRequest): Promise<void | Error | object[]>{

        const isbnJaAssociado = await this.livrosRepository.buscaPorIsbn(isbn);
        
        if(isbnJaAssociado){
            return new Error("ISBN já está associado a outro livro");
        }

        const sbnEhValido = isbn  
        const nomeEhValido = nome  
        const autorEhValido = autor 
        const estoqueEhValido = estoque > 0 ? true : undefined;

        const validacoes = [
            {
                campo: 'isbn',
                valido: sbnEhValido,
                mensagem: 'isbn deve ser preenchido'
            },
            {
                campo: 'nome',
                valido: nomeEhValido,
                mensagem: 'Nome deve ser preenchido'
            },
            {
                campo: 'autor',
                valido: autorEhValido,
                mensagem: 'Autor deve ser preenchido'
            },
            {
                campo: 'estoque',
                valido: estoqueEhValido,
                mensagem: 'Estoque deve ser maior que 0'
            }
        ]
        
        const erros: Object[] = validacoes.filter( campo => !campo.valido)

        const existeErro = erros.length

        if(existeErro){
            return erros
        } else {
            this.livrosRepository.adiciona({isbn, nome, autor, descricao, estoque });
        }
    }
}