import { LivrosRepository } from "../../repositories/implementations/LivrosRepository";
import { UpdateLivroController } from "./UpdateLivroController";
import { UpdateLivroUseCase } from "./UpdateLivroUseCase";

export default () => {

    const livrosRepository = new LivrosRepository();

    const updateLivroUseCase = new UpdateLivroUseCase(livrosRepository);

    const updateLivroController = new UpdateLivroController(updateLivroUseCase); 

    return updateLivroController 

} 