const request = require('supertest')
const app = require('../controllers/servicoEstoque')


describe("app Test", () => {
    it('GET resultados', async () => {
        const res = await request(app).get('/estoque')
        expect(res.body).toHaveProperty('resultados')
    })
    it('GET resultados falha', async () => {
        const res = await request(app).get('/estoque')
        expect(res.body).toHaveProperty('resultado')
    })
        
})