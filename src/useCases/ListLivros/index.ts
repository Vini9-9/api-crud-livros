import { LivrosRepository } from "../../repositories/implementations/LivrosRepository";
import { ListLivrosController } from "./ListLivrosController";
import { ListLivrosUseCase } from "./ListLivrosUseCase";

export default () => {

    const livrosRepository = new LivrosRepository();

    const listLivrosUseCase = new ListLivrosUseCase(livrosRepository);

    const listLivrosController = new ListLivrosController(listLivrosUseCase); 

    return  listLivrosController 
    
} 