import { Request, Response } from 'express'
import { LivrosRepository } from '../repositories/implementations/LivrosRepository';
import { ListLivroByIsbnService } from '../services/ListLivroByIsbnService';

export class ListLivroByIsbnController {
    async handle(request: Request, response: Response){
        const isbn = request.params.isbn

        const livrosRepository = new LivrosRepository()

        const service = new ListLivroByIsbnService(livrosRepository);
        const result = await service.execute(isbn) 

        if(result instanceof Error){
            return response.status(400)
        }
        
        return response.json(result)
    }
}