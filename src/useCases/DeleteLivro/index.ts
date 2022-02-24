import { LivrosRepository } from "../../repositories/implementations/LivrosRepository";
import { DeleteLivroController } from "./DeleteLivroController";
import { DeleteLivroUseCase } from "./DeleteLivroUseCase";

export default () => {

    const livrosRepository = new LivrosRepository();

    const deleteLivroUseCase = new DeleteLivroUseCase(livrosRepository);

    const deleteLivroController = new DeleteLivroController(deleteLivroUseCase); 

    return deleteLivroController 
    
}