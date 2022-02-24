import { Request, Response } from 'express'
import { LivrosRepository } from '../../repositories/implementations/LivrosRepository';
import { ListLivroByIsbnUseCase } from './ListLivroByIsbnUseCase';

export class ListLivroByIsbnController {

    constructor(private listLivrosUseCase: ListLivroByIsbnUseCase){

    }

    async handle(request: Request, response: Response){
        const isbn = request.params.isbn

        const result = await this.listLivrosUseCase.execute(isbn) 

        if(result instanceof Error){
            return response.status(400)
        }
        
        return response.json(result)
    }
}