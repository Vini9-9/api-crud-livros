import { Livro } from "../../entities/Livro";
import { ILivrosRepository } from "../../repositories/ILivrosRepository";

interface IRequest {
    page: number;
    limit: number;
}

export class ListLivrosUseCase {

    constructor(private livrosRepository: ILivrosRepository){

    }

    async execute({page, limit}: IRequest): Promise<Livro[] | Error>{
        
         const resultadoPaginado = await this.livrosRepository.pagina({page, limit});
         const resultadoNomes = await this.livrosRepository.exibePorPropriedade(resultadoPaginado, "nome");

         if(resultadoNomes.length){
             return resultadoNomes
         }

         return new Error("Nenhum registro foi encontrado")

    }
}
