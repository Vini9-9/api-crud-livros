import { Livro } from "../../entities/Livro";
import { ILivrosRepository } from "../../repositories/ILivrosRepository";

interface IRequest {
    page: number;
    limit: number;
}

export class ListLivrosUseCase {

    constructor(private livrosRepository: ILivrosRepository){

    }

    execute({page, limit}: IRequest): Promise<Livro[] | Error>{
        return this.livrosRepository.lista({page, limit});
    }
}
