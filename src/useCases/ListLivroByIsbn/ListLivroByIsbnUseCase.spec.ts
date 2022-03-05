import { Livro } from "src/entities/Livro";
import { LivrosRepositoryInMemory } from "../../repositories/in-memory/LivrosRepositoryInMemory"
import { CreateLivroUseCase } from "../CreateLivro/CreateLivroUseCase";
import { ListLivroByIsbnUseCase } from "./ListLivroByIsbnUseCase"


let livrosRepositoryInMemory: LivrosRepositoryInMemory;
let createLivroUseCase: CreateLivroUseCase;
let listLivroByIsbnUseCase: ListLivroByIsbnUseCase;
let novoLivro: Livro;
let outroLivro: Livro;

describe("List Livro by ISBN", () => {

    beforeEach(async () => {
        livrosRepositoryInMemory = new LivrosRepositoryInMemory()
        createLivroUseCase = new CreateLivroUseCase(livrosRepositoryInMemory)
        listLivroByIsbnUseCase = new ListLivroByIsbnUseCase(livrosRepositoryInMemory)

        novoLivro = {
            isbn: "1-teste",
            nome: "nome do Livro",
            autor: "autor do livro",
            descricao: "descricao do livro",
            estoque: 100
        }

        outroLivro = {
            isbn: "2-teste",
            nome: "nome do outro Livro",
            autor: "autor do outro livro",
            descricao: "descricao do outro livro",
            estoque: 102
        }

        await createLivroUseCase.execute(novoLivro)

        await createLivroUseCase.execute(outroLivro)
    })
    
    it("Deve localizar um livro por isbn", async () => {

        const livroCriado = await listLivroByIsbnUseCase.execute(novoLivro.isbn)

        expect(livroCriado).toBeDefined();

        expect.objectContaining([
            expect.objectContaining({isbn: novoLivro.isbn}),
            expect.objectContaining({nome: novoLivro.nome}),
            expect.objectContaining({autor: novoLivro.autor}),
            expect.objectContaining({descricao: novoLivro.descricao}),
            expect.objectContaining({estoque: novoLivro.estoque})
        ])
 
    })

    it("Não deve listar um livro com isbn inexistente", async () => {

        const isbn = "99-teste"
        const result = await listLivroByIsbnUseCase.execute(isbn)
        
        const msgErroISBN = "ISBN não localizado"
        
        expect(result).toBeInstanceOf(Error);

        expect.arrayContaining([
            expect.objectContaining({Error: msgErroISBN}),
          ])
 
    })
})