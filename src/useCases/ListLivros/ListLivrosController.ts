import { Request, Response } from 'express'
import { ListLivrosUseCase } from './ListLivrosUseCase'

export class ListLivrosController {

    constructor(private listLivrosUseCase: ListLivrosUseCase){

    }

    async handle(request: Request, response: Response){
        
        const page = Number(request.query.page)
        const limit = Number(request.query.limit)
        
        const result = await this.listLivrosUseCase.execute({ page , limit }) 

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }
        
        return response.json(result)
    }
}