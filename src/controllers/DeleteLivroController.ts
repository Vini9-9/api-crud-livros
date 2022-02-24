import { Request, Response } from 'express'
import { LivrosRepository } from '../repositories/implementations/LivrosRepository';
import { DeleteLivroService } from '../services/DeleteLivroService';

export class DeleteLivroController {
    async handle(request: Request, response: Response){
        const isbn = request.params.isbn

        const livrosRepository = new LivrosRepository()

        const service = new DeleteLivroService(livrosRepository);
        const result = await service.execute(isbn)
        

        if(result instanceof Error){
            console.log("ENTROU ERRO")
            return response.status(400).json(result.message)
        }
        
        return response.json({ message: "Deletado com sucesso"})
    }
}