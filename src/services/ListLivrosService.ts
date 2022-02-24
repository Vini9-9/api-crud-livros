import { Livro } from "../entities/Livro";
import { ILivrosRepository } from "../repositories/ILivrosRepository";

interface IRequest {
    page: number;
    limit: number;
}

export class ListLivrosService {

    constructor(private livrosRepository: ILivrosRepository){

    }

    execute({page, limit}: IRequest): Promise<Livro[]>{

        return this.livrosRepository.lista({page, limit});
    }
}
