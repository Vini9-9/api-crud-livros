import { Livro } from "../model/Livro";
import { ILivrosRepository } from "../repositories/ILivrosRepository";

interface IRequest {
    page: number;
    limit: number;
}

class ListLivroService {

    constructor(private livrosRepository: ILivrosRepository){

    }

    execute({page, limit}: IRequest): Livro[]{

        return this.livrosRepository.lista({page, limit});
    }
}

export { ListLivroService }