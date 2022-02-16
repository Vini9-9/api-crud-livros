const request = require('supertest')
const app = require('../controllers/servicoEstoque')


describe("app Test rotas", () => {
    it('GET resultados', async () => {
        const res = await request(app).get('/estoque')
        expect(res.body).toHaveProperty('resultados')
    })
    it('GET com SBN', async () => {
        const res = await request(app).get('/estoque/0')
        expect(res.body.sbn).toBe(0)
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
        expect(res.body.sbn).toBe(`${sbn}`)
    })
        
})