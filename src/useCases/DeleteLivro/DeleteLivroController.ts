import { Request, Response } from 'express'
import { LivrosRepository } from '../../repositories/implementations/LivrosRepository';
import { DeleteLivroUseCase } from './DeleteLivroUseCase';

export class DeleteLivroController {

    constructor(private deleteLivroUseCase: DeleteLivroUseCase){

    }

    async handle(request: Request, response: Response){
        const isbn = request.params.isbn

        const result = await this.deleteLivroUseCase.execute(isbn)

        if(result instanceof Error){
            return response.status(404).json(result.message)
        }
        
        return response.status(200).json(
            { 
                isbn: isbn,
                message: "Livro deletado com sucesso"
            }
        )
    }
}