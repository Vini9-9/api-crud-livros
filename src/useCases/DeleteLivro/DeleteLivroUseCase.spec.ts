import { LivrosRepositoryInMemory } from "../../repositories/in-memory/LivrosRepositoryInMemory"
import { CreateLivroUseCase } from "../CreateLivro/CreateLivroUseCase";
import { DeleteLivroUseCase } from "./DeleteLivroUseCase"


let livrosRepositoryInMemory: LivrosRepositoryInMemory;
let createLivroUseCase: CreateLivroUseCase;
let deleteLivroUseCase: DeleteLivroUseCase;

describe("Delete Livro", () => {

    beforeEach(() => {
        livrosRepositoryInMemory = new LivrosRepositoryInMemory()
        createLivroUseCase = new CreateLivroUseCase(livrosRepositoryInMemory)
        deleteLivroUseCase = new DeleteLivroUseCase(livrosRepositoryInMemory)
    })
    
    it("Deve deletar um livro no estoque", async () => {

        const novoLivro = {
            isbn: "1",
            nome: "nome do Livro",
            autor: "autor do livro",
            descricao: "descricao do livro",
            estoque: 100
        }

        await createLivroUseCase.execute(novoLivro)

        await deleteLivroUseCase.execute(novoLivro.isbn)

        const result = await livrosRepositoryInMemory.buscaPorIsbn(novoLivro.isbn)

        expect(result).toBeUndefined();
 
    })

    it("Não deve deletar um livro com isbn que não existe", async () => {

        const msgErroISBN = "ISBN não localizado"
        const isbn = "1"
        const result = await deleteLivroUseCase.execute(isbn)

        expect(result).toBeInstanceOf(Error);

        expect.arrayContaining([
            expect.objectContaining({Error: msgErroISBN}),
          ])

    });
})