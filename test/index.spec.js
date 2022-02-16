const request = require('supertest')
const app = require('../controllers/servicoEstoque')


describe("app Test", () => {
    it('GET resultados', async () => {
        const res = await request(app).get('/estoque')
        expect(res.body).toHaveProperty('resultados')
    })
    it('GET com SBN', async () => {
        const res = await request(app).get('/estoque/0')
        console.log(res.body.sbn)
        expect(res.body.sbn).toBe(0)
    })
        
})