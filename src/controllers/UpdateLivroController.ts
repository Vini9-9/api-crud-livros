import { Request, Response } from 'express'
import { LivrosRepository } from '../repositories/implementations/LivrosRepository';
import { UpdateLivroService } from '../services/UpdateLivroService';

export class UpdateLivroController {
    async handle(request: Request, response: Response){
        const isbn = request.params.isbn
        const { nome, autor, descricao, estoque } = request.body

        const livrosRepository = new LivrosRepository()

        const service = new UpdateLivroService(livrosRepository);
        const result = await service.execute(isbn, { nome, autor, descricao, estoque})

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }
        
        return response.json({ message: "Atualizado com sucesso"})
    }
}