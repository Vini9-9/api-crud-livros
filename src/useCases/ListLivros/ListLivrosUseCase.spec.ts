import { Livro } from "src/entities/Livro";
import { LivrosRepositoryInMemory } from "../../repositories/in-memory/LivrosRepositoryInMemory"
import { CreateLivroUseCase } from "../CreateLivro/CreateLivroUseCase";
import { ListLivrosUseCase } from "./ListLivrosUseCase"


let livrosRepositoryInMemory: LivrosRepositoryInMemory;
let createLivroUseCase: CreateLivroUseCase;
let listLivrosUseCase: ListLivrosUseCase;

describe("List Livros", () => {

    beforeEach(async () => {
        livrosRepositoryInMemory = new LivrosRepositoryInMemory()
        createLivroUseCase = new CreateLivroUseCase(livrosRepositoryInMemory)
        listLivrosUseCase = new ListLivrosUseCase(livrosRepositoryInMemory)

    })
    
/*     it("Deve listar os nomes dos livros", async () => {
        const page = 1;
        const limit = 5;
        const numLivros = 3;

        const result = await listLivrosUseCase.execute({page , limit})

        expect.stringContaining(livros?.nome),
        expect.objectContaining({estoque: livro?.estoque})


        const primeiroLivro = await livrosRepositoryInMemory.buscaPorIsbn("0")
        const segundoLivro = await livrosRepositoryInMemory.buscaPorIsbn("1")
        const terceiroLivro = await livrosRepositoryInMemory.buscaPorIsbn("2")
 
    }) */

    it("Deve listar os nomes paginados", async () => {
        const page = 1;
        const limit = 2;

        const result = await listLivrosUseCase.execute({page , limit})

        expect(result).toHaveLength(limit);
 
    })

    it("Não deve listar se não tem registros", async () => {

        const page = 1;
        const limit = 3;

        livrosRepositoryInMemory.limpaRepository();
        const result = await listLivrosUseCase.execute({page , limit})
        
        const msgErroSemRegistro = "Nenhum registro foi encontrado"
        
        expect(result).toBeInstanceOf(Error);

        expect.arrayContaining([
            expect.objectContaining({Error: msgErroSemRegistro}),
          ])
 
    })
})