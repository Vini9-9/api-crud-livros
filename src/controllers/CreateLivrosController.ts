import { Request, Response } from 'express'
import { LivrosRepository } from '../repositories/implementations/LivrosRepository';
import { CreateLivroService } from '../services/CreateLivroService'

export class CreateLivroController {
    async handle(request: Request, response: Response){
        const {isbn, nome, autor, descricao, estoque} = request.body

        const livrosRepository = new LivrosRepository()

        const service = new CreateLivroService(livrosRepository);
        const erro = service.execute({isbn, nome, autor, descricao, estoque}) instanceof Error
        console.log("erro", erro)

        if(erro){
            console.log("ENTROU ERRO")
            return response.status(400)
        }
        
        return response.json({ message: "Criado"})
    }
}