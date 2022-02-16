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