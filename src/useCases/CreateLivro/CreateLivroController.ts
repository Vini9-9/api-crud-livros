import { Request, Response } from 'express'
import { LivrosRepository } from '../../repositories/implementations/LivrosRepository';
import { CreateLivroUseCase } from './CreateLivroUseCase'

export class CreateLivroController {

    constructor(private createLivroUseCase: CreateLivroUseCase){

    }

    async handle(request: Request, response: Response): Promise<Response>{
        const {isbn, nome, autor, descricao, estoque} = request.body

        const result = await this.createLivroUseCase.execute({isbn, nome, autor, descricao, estoque}) 

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }
        
        return response.status(201).send()
    }
}