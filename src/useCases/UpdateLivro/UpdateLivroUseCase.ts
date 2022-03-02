import { Livro } from "../../entities/Livro";
import { ILivrosRepository } from "../../repositories/ILivrosRepository";

interface IRequest {
    isbn?: string;
    nome?: string;
    autor?: string;
    descricao?: string;
    estoque?: number;
}

export class UpdateLivroUseCase {

    constructor(private livrosRepository: ILivrosRepository){

    }

    async execute(isbnParam: string, { isbn, nome, autor, descricao, estoque}: IRequest): Promise<Livro | Error | object[]>{
        
        const isbnJaAssociado = await this.livrosRepository.buscaPorIsbn(isbnParam);

        if(!isbnJaAssociado){
            return new Error("ISBN não localizado");
        }

        const naoRecebeSbn = !isbn ? true : undefined;
        const recebeEstoque = estoque 
        var estoqueEhValido = true

        if(recebeEstoque){
            estoqueEhValido = estoque > 0 
        } 

        const validacoes = [
            {
                campo: 'estoque',
                valido: estoqueEhValido,
                mensagem: 'Estoque deve ser maior que 0'
            },
            {
                campo: 'isbn',
                valido: naoRecebeSbn,
                mensagem: 'isbn não pode ser atualizado'
            }
        ]
        
        const erros: object[] = validacoes.filter( campo => !campo.valido)
        const existeErro = erros.length

        if(existeErro) {
            return erros;
        }

        const livroAtualizado = this.livrosRepository.atualizaPorIsbn(isbnJaAssociado, { nome, autor, descricao, estoque});

        return livroAtualizado
    }
}
