import { LivrosRepository } from "../../repositories/implementations/LivrosRepository";
import { CreateLivroController } from "./CreateLivroController";
import { CreateLivroUseCase } from "./CreateLivroUseCase";

export default (): CreateLivroController => {

    const livrosRepository = new LivrosRepository();

    const createLivroUseCase = new CreateLivroUseCase(livrosRepository);

    const createLivroController = new CreateLivroController(createLivroUseCase); 

    return createLivroController 
}

