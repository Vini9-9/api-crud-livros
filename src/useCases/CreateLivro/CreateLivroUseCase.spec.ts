import { Livro } from "src/entities/Livro";
import { LivrosRepositoryInMemory } from "../../repositories/in-memory/LivrosRepositoryInMemory"
import { CreateLivroUseCase } from "./CreateLivroUseCase"


let livrosRepositoryInMemory: LivrosRepositoryInMemory;
let createLivroUseCase: CreateLivroUseCase;
let novoLivro: Livro;

describe("Create Livro", () => {

    beforeEach(() => {
        livrosRepositoryInMemory = new LivrosRepositoryInMemory()
        createLivroUseCase = new CreateLivroUseCase(livrosRepositoryInMemory)

        novoLivro = {
            isbn: "1-teste",
            nome: "nome do Livro",
            autor: "autor do livro",
            descricao: "descricao do livro",
            estoque: 100
        }
    })
    
    it("Deve adicionar um livro no estoque", async () => {

        await createLivroUseCase.execute(novoLivro)

        const livroCriado = await livrosRepositoryInMemory.buscaPorIsbn(novoLivro.isbn)

        expect(livroCriado?.isbn).toBe(novoLivro.isbn);
        expect(livroCriado?.nome).toBe(novoLivro.nome);
        expect(livroCriado?.autor).toBe(novoLivro.autor);
        expect(livroCriado?.descricao).toBe(novoLivro.descricao);
        expect(livroCriado?.estoque).toBe(novoLivro.estoque);
 
    })
    
    it("Não deve adicionar um livro com estoque negativo", async () => {

        novoLivro = {
            isbn: "1-teste",
            nome: "nome do Livro",
            autor: "autor do livro",
            descricao: "descricao do livro",
            estoque: -4
        }

        const result = await createLivroUseCase.execute(novoLivro)

        expect(result).toEqual(
            expect.arrayContaining([
              expect.objectContaining({"campo": "estoque"}),
              expect.objectContaining({"mensagem": "Estoque deve ser maior que 0"})
            ])
          );
    });

    it("Não deve adicionar um livro com o mesmo isbn", async () => {

        const msgErroISBN = "ISBN já está associado a outro livro"

        await createLivroUseCase.execute(novoLivro)

        const result = await createLivroUseCase.execute(novoLivro)

        expect(result).toBeInstanceOf(Error)

        expect.arrayContaining([
            expect.objectContaining({Error: msgErroISBN}),
          ])

    });
})