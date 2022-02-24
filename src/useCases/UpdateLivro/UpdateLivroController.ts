import { Request, Response } from 'express'
import { LivrosRepository } from '../../repositories/implementations/LivrosRepository';
import { UpdateLivroUseCase } from './UpdateLivroUseCase';

export class UpdateLivroController {

    constructor(private updateLivroUseCase: UpdateLivroUseCase){

    }

    async handle(request: Request, response: Response){
        const isbnParam = request.params.isbn
        const { isbn, nome, autor, descricao, estoque } = request.body

        const result = await this.updateLivroUseCase.execute(isbnParam, { isbn, nome, autor, descricao, estoque})
        const temErroCampo = typeof result === 'object'
        

        if(result instanceof Error){
            return response.status(404).json(result.message)
        } else if(temErroCampo){
            return response.status(400).json(result)
        }
        
        return response.json(result)
        
    }
}