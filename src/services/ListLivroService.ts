import { Livro } from "../model/Livro";
import { LivrosRepository } from "../repositories/LivrosRepository";

interface IRequest {
    page: number;
    limit: number;
}

class ListLivroService {

    constructor(private livrosRepository: LivrosRepository){

    }

    execute({page, limit}: IRequest): Livro[]{

        return this.livrosRepository.lista({page, limit});
    }
}

export { ListLivroService }