import { Request, Response } from 'express'
import { LivrosRepository } from '../../repositories/implementations/LivrosRepository';
import { UpdateLivroUseCase } from './UpdateLivroUseCase';

export class UpdateLivroController {

    constructor(private updateLivroUseCase: UpdateLivroUseCase){

    }

    async handle(request: Request, response: Response){
        const isbn = request.params.isbn
        const { nome, autor, descricao, estoque } = request.body

        const result = await this.updateLivroUseCase.execute(isbn, { nome, autor, descricao, estoque})

        if(result instanceof Error){
            return response.status(404).json(result.message)
        }
        
        return response.json({ message: "Atualizado com sucesso"})
    }
}