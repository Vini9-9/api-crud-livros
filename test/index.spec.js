const request = require('supertest')
const app = require('../controllers/servicoEstoque')


describe("app Test rotas caminho feliz", () => {
    it('GET resultados', async () => {
        const res = await request(app).get('/estoque')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('resultados')
    })
    it('GET por SBN', async () => {
        const sbn = 0 
        const res = await request(app).get('/estoque/' + sbn)
        expect(res.statusCode).toEqual(200)
        expect(res.body.sbn).toBe(sbn)
    })
    it('POST', async () => {
        const sbn = 999 
        const res = await request(app).post('/estoque')
        .send({
            "nome": "Testes X",
            "sbn": `${sbn}`,
            "autor": "Criador do teste x",
            "estoque": "99",
            "descricao": "livro sobre testes x"
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body.sbn).toBe(`${sbn}`)
    })
    it('PATCH por SBN', async () => {
        const sbn = 1 
        const novoEstoque = 99 

        const res = await request(app).patch('/estoque/' + sbn)
        .send({
            "estoque": `${novoEstoque}`,
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body.estoque).toBe(`${novoEstoque}`)
    })
    it('DELETE por SBN', async () => {
        const sbn = 999 
        const res = await request(app).delete('/estoque/' + sbn)
        expect(res.statusCode).toEqual(200)
        expect(res.body.sbn).toBe(sbn)
    })
})

describe("GET - Paginação", () => {
    it('Resultados totalPagina', async () => {
        const res = await request(app).get('/estoque')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('totalPagina')
        const resultados = res.body.resultados
        expect(res.body.totalPagina).toBe(resultados.length)
        
    })
    it('Resultados proxima página', async () => {
        let page = 1
        const limit = 3
        const res = await request(app).get(`/estoque?page=${page}&limit=${limit}`)
        
        expect(res.statusCode).toEqual(200)

        expect(res.body).toHaveProperty('proxima')
        expect(res.body.proxima.page).toBe(page + 1)
        
    })
    it('Resultados página anterior', async () => {
        let page = 2
        const limit = 3
        const res = await request(app).get(`/estoque?page=${page}&limit=${limit}`)
        
        expect(res.statusCode).toEqual(200)

        expect(res.body).toHaveProperty('anterior')
        expect(res.body.anterior.page).toBe(page - 1)
        
    })
})

describe("GET - erros", () => {
    it('GET sbn inválido', async () => {
        const sbn = 24444 
        const res = await request(app).get('/estoque/'  + sbn)
        
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('SBN não localizado')
    })
    it('GET sbn tipo inválido', async () => {
        const sbn = "a" 
        const res = await request(app).get('/estoque/'  + sbn)
        
        expect(res.statusCode).toEqual(406)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('SBN deve ser um número')
    })
})

describe("POST - erros", () => {
    it('POST sbn inválido', async () => {
        const sbn = 0 
        const res = await request(app).post('/estoque/')
        .send({
            "nome": "Testes X",
            "sbn": `${sbn}`,
            "autor": "Criador do teste x",
            "estoque": "99",
            "descricao": "livro sobre testes x"
        })

        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('SBN já está associado a outro livro')
    })
    it('POST sbn não informado', async () => {
        const sbn = 0 
        const res = await request(app).post('/estoque/')
        .send({
            "nome": "Testes X",
            "autor": "Criador do teste x",
            "estoque": "99",
            "descricao": "livro sobre testes x"
        })

        expect(res.statusCode).toEqual(400)
        expect(res.body[0]).toHaveProperty('mensagem')
        expect(res.body[0].mensagem).toBe('SBN deve ser preenchido')
    })
    it('POST estoque inválido', async () => {
        const sbn = 11111 
        const res = await request(app).post('/estoque/')
        .send({
            "nome": "Testes X",
            "sbn": `${sbn}`,
            "autor": "Criador do teste x",
            "estoque": "a",
            "descricao": "livro sobre testes x"
        })

        expect(res.statusCode).toEqual(400)
        expect(res.body[0]).toHaveProperty('mensagem')
        expect(res.body[0].mensagem).toBe('Estoque deve ser maior que 0')
    })
    it('POST nome não informado', async () => {
        const sbn = 11112 
        const res = await request(app).post('/estoque/')
        .send({
            "sbn": `${sbn}`,
            "autor": "Criador do teste x",
            "estoque": "10",
            "descricao": "livro sobre testes x"
        })

        expect(res.statusCode).toEqual(400)
        expect(res.body[0]).toHaveProperty('mensagem')
        expect(res.body[0].mensagem).toBe('Nome deve ser preenchido')
    })
    it('POST autor não informado', async () => {
        const sbn = 11112 
        const res = await request(app).post('/estoque/')
        .send({
            "nome": "Testes X",
            "sbn": `${sbn}`,
            "estoque": "10",
            "descricao": "livro sobre testes x"
        })

        expect(res.statusCode).toEqual(400)
        expect(res.body[0]).toHaveProperty('mensagem')
        expect(res.body[0].mensagem).toBe('Autor deve ser preenchido')
    })
})

describe("PATCH - erros", () => {
    it('Atualizar o sbn', async () => {
        const sbn = 0 
        const novoSbn = 1114 
        const res = await request(app).patch('/estoque/' + sbn)
        .send({
            "nome": "Testes X",
            "sbn": `${novoSbn}`,
        })

        const resBody = res.body[0]

        expect(res.statusCode).toEqual(406)
        expect(resBody).toHaveProperty('mensagem')
        expect(resBody.mensagem).toBe('SBN não pode ser atualizado')
    })
    it('sbn inválido', async () => {
        const sbn = "a" 
        const res = await request(app).patch('/estoque/' + sbn)
        .send({
            "nome": "Testes X",
        })
        const resBody = res.body[0]

        expect(res.statusCode).toEqual(406)
        expect(resBody).toHaveProperty('mensagem')
        expect(resBody.mensagem).toBe('SBN deve ser um número')
    })
    it('estoque inválido', async () => {
        const sbn = 0 
        const res = await request(app).patch('/estoque/' + sbn)
        .send({
            "nome": "Testes X",
            "estoque": "0",
            "descricao": "livro sobre testes x"
        })

        const resBody = res.body[0]

        expect(res.statusCode).toEqual(406)
        expect(resBody).toHaveProperty('mensagem')
        expect(resBody.mensagem).toBe('Estoque deve ser maior que 0')
    })
    
})
