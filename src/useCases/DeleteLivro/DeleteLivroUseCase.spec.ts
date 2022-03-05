import { Livro } from "src/entities/Livro";
import { LivrosRepositoryInMemory } from "../../repositories/in-memory/LivrosRepositoryInMemory"
import { CreateLivroUseCase } from "../CreateLivro/CreateLivroUseCase";
import { DeleteLivroUseCase } from "./DeleteLivroUseCase"


let livrosRepositoryInMemory: LivrosRepositoryInMemory;
let createLivroUseCase: CreateLivroUseCase;
let deleteLivroUseCase: DeleteLivroUseCase;
let novoLivro: Livro;

describe("Delete Livro", () => {

    beforeEach(() => {
        livrosRepositoryInMemory = new LivrosRepositoryInMemory()
        createLivroUseCase = new CreateLivroUseCase(livrosRepositoryInMemory)
        deleteLivroUseCase = new DeleteLivroUseCase(livrosRepositoryInMemory)

        novoLivro = {
            isbn: "1-teste",
            nome: "nome do Livro",
            autor: "autor do livro",
            descricao: "descricao do livro",
            estoque: 100
        }
    })
    
    it("Deve deletar um livro no estoque", async () => {

        await createLivroUseCase.execute(novoLivro)

        await deleteLivroUseCase.execute(novoLivro.isbn)

        const result = await livrosRepositoryInMemory.buscaPorIsbn(novoLivro.isbn)

        expect(result).toBeUndefined();
 
    })

    it("Não deve deletar um livro com isbn que não existe", async () => {

        const isbn = "99-teste"
        const result = await deleteLivroUseCase.execute(isbn)
        
        const msgErroISBN = "ISBN não localizado"
        
        expect(result).toBeInstanceOf(Error);

        expect.arrayContaining([
            expect.objectContaining({Error: msgErroISBN}),
          ])

    });
})