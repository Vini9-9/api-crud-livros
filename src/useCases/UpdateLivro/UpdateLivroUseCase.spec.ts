import { Livro } from "src/entities/Livro";
import { LivrosRepositoryInMemory } from "../../repositories/in-memory/LivrosRepositoryInMemory"
import { CreateLivroUseCase } from "../CreateLivro/CreateLivroUseCase";
import { UpdateLivroUseCase } from "./UpdateLivroUseCase"


let livrosRepositoryInMemory: LivrosRepositoryInMemory;
let createLivroUseCase: CreateLivroUseCase;
let updateLivroUseCase: UpdateLivroUseCase;
let novoLivro: Livro;

describe("Update Livro", () => {

    beforeEach(async () => {
        livrosRepositoryInMemory = new LivrosRepositoryInMemory()
        createLivroUseCase = new CreateLivroUseCase(livrosRepositoryInMemory)
        updateLivroUseCase = new UpdateLivroUseCase(livrosRepositoryInMemory)

        novoLivro = {
            isbn: "1-teste",
            nome: "nome do Livro",
            autor: "autor do livro",
            descricao: "descricao do livro",
            estoque: 100
        }

        await createLivroUseCase.execute(novoLivro)
    })
    
    it("Deve atualizar o nome de um livro no estoque", async () => {

        const atualizacoesLivro = {
            nome: "nome do Livro atualizado"
        }

        await updateLivroUseCase.execute(novoLivro.isbn, atualizacoesLivro)

        const result = await livrosRepositoryInMemory.buscaPorIsbn(novoLivro.isbn)

        expect(result?.isbn).toBe(novoLivro.isbn);
        expect(result?.nome).toBe(atualizacoesLivro.nome);
        expect(result?.autor).toBe(novoLivro.autor);
        expect(result?.descricao).toBe(novoLivro.descricao);
        expect(result?.estoque).toBe(novoLivro.estoque);
 
    })

    it("Deve atualizar o autor de um livro no estoque", async () => {

        const atualizacoesLivro = {
            autor: "autor do livro atualizado"
        }

        await updateLivroUseCase.execute(novoLivro.isbn, atualizacoesLivro)

        const result = await livrosRepositoryInMemory.buscaPorIsbn(novoLivro.isbn)

        expect(result?.isbn).toBe(novoLivro.isbn);
        expect(result?.nome).toBe(novoLivro.nome);
        expect(result?.autor).toBe(atualizacoesLivro.autor);
        expect(result?.descricao).toBe(novoLivro.descricao);
        expect(result?.estoque).toBe(novoLivro.estoque);
 
    })

    it("Deve atualizar a descri????o de um livro no estoque", async () => {

        const atualizacoesLivro = {
            descricao: "descricao do livro atualizada"
        }

        await updateLivroUseCase.execute(novoLivro.isbn, atualizacoesLivro)

        const result = await livrosRepositoryInMemory.buscaPorIsbn(novoLivro.isbn)

        expect(result?.isbn).toBe(novoLivro.isbn);
        expect(result?.nome).toBe(novoLivro.nome);
        expect(result?.autor).toBe(novoLivro.autor);
        expect(result?.descricao).toBe(atualizacoesLivro.descricao);
        expect(result?.estoque).toBe(novoLivro.estoque);
 
    })

    it("Deve atualizar o estoque de um livro no estoque", async () => {

        const atualizacoesLivro = {
            estoque: 1
        }

        await createLivroUseCase.execute(novoLivro)

        await updateLivroUseCase.execute(novoLivro.isbn, atualizacoesLivro)

        const result = await livrosRepositoryInMemory.buscaPorIsbn(novoLivro.isbn)

        expect(result?.isbn).toBe(novoLivro.isbn);
        expect(result?.nome).toBe(novoLivro.nome);
        expect(result?.autor).toBe(novoLivro.autor);
        expect(result?.descricao).toBe(novoLivro.descricao);
        expect(result?.estoque).toBe(atualizacoesLivro.estoque);
 
    })

    it("N??o deve atualizar um livro com isbn inexistente", async () => {
        
        const isbn = "99-teste"
        
        const atualizacoesLivro = {
            nome: "Livro que n??o existe"
        }

        const result = await updateLivroUseCase.execute(isbn, atualizacoesLivro)

        const msgErroISBN = "ISBN n??o localizado"

        expect(result).toBeInstanceOf(Error);

        expect.arrayContaining([
            expect.objectContaining({Error: msgErroISBN}),
          ])

    });

    it("N??o deve atualizar o isbn de um livro", async () => {

        const atualizacoesLivro = {
            isbn: "10-teste"
        }

        const result = await updateLivroUseCase.execute(novoLivro.isbn, atualizacoesLivro)

        expect(result).toEqual(
            expect.arrayContaining([
              expect.objectContaining({"campo": "isbn"}),
              expect.objectContaining({"mensagem": "isbn n??o pode ser atualizado"})
            ])
          );
    });

    it("N??o deve atualizar o estoque com valor inv??lido", async () => {

        const atualizacoesLivro = {
            estoque: -4
        }

        const result = await updateLivroUseCase.execute(novoLivro.isbn, atualizacoesLivro)

        expect(result).toEqual(
            expect.arrayContaining([
              expect.objectContaining({"campo": "estoque"}),
              expect.objectContaining({"mensagem": "Estoque deve ser maior que 0"})
            ])
          );

    });
})