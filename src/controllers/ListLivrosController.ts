import { Request, Response } from 'express'
import { LivrosRepository } from '../repositories/implementations/LivrosRepository';
import { ListLivrosService } from '../services/ListLivrosService'

export class ListLivrosController {
    async handle(request: Request, response: Response){
        const page = request.query.page
        const limit = request.query.limit

        const livrosRepository = new LivrosRepository()

        const service = new ListLivrosService(livrosRepository);
        const result = await service.execute({page , limit }) 

        if(result instanceof Error){
            return response.status(400)
        }
        
        return response.json(result)
    }
}