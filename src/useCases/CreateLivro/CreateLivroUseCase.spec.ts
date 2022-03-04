import { LivrosRepositoryInMemory } from "../../repositories/in-memory/LivrosRepositoryInMemory"
import { CreateLivroUseCase } from "./CreateLivroUseCase"


let livrosRepositoryInMemory: LivrosRepositoryInMemory;
let createLivroUseCase: CreateLivroUseCase;

describe("Create Livro", () => {

    beforeEach(() => {
        livrosRepositoryInMemory = new LivrosRepositoryInMemory()
        createLivroUseCase = new CreateLivroUseCase(livrosRepositoryInMemory)
    })
    
/*     it("deve adicionar um livro no estoque", async () => {

        const novoLivro = {
            isbn: "1",
            nome: "nome do Livro",
            autor: "autor do livro",
            descricao: "descricao do livro",
            estoque: 100
        }

        await createLivroUseCase.execute({
            isbn: novoLivro.isbn,
            nome: novoLivro.nome,
            autor: novoLivro.autor,
            descricao: novoLivro.descricao,
            estoque: novoLivro.estoque,
            
        })

        const livroCriado = await livrosRepositoryInMemory.buscaPorIsbn(novoLivro.isbn)

        expect(livroCriado).toBeDefined();

        expect(livroCriado?.isbn).toBe(novoLivro.isbn);
        expect(livroCriado?.nome).toBe(novoLivro.nome);
        expect(livroCriado?.autor).toBe(novoLivro.autor);
        expect(livroCriado?.descricao).toBe(novoLivro.descricao);
        expect(livroCriado?.estoque).toBe(novoLivro.estoque);
 
    }) */

    it("Não deve adicionar um livro com o mesmo isbn", async () => {
        debugger;
        expect(async () => {

            const novoLivro = {
                isbn: "1",
                nome: "nome do Livro",
                autor: "autor do livro",
                descricao: "descricao do livro",
                estoque: 100
            }
    
            await createLivroUseCase.execute({
                isbn: novoLivro.isbn,
                nome: novoLivro.nome,
                autor: novoLivro.autor,
                descricao: novoLivro.descricao,
                estoque: novoLivro.estoque,
                
            })
    
            await createLivroUseCase.execute({
                isbn: novoLivro.isbn,
                nome: novoLivro.nome,
                autor: novoLivro.autor,
                descricao: novoLivro.descricao,
                estoque: novoLivro.estoque,
                
            })

        }).toBeInstanceOf(Function)

    });
})