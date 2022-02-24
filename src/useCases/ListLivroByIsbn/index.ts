import { LivrosRepository } from "../../repositories/implementations/LivrosRepository";
import { ListLivroByIsbnController } from "./ListLivroByIsbnController";
import { ListLivroByIsbnUseCase } from "./ListLivroByIsbnUseCase";

export default () => {

    const livrosRepository = new LivrosRepository();

    const listLivroByIsbnUseCase = new ListLivroByIsbnUseCase(livrosRepository);

    const listLivroByIsbnController = new ListLivroByIsbnController(listLivroByIsbnUseCase); 

    return listLivroByIsbnController 
    
} 