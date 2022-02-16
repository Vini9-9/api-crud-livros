const Estoque = require('../models/estoque')
const configExpress = require('../config/configExpress')
const app = configExpress()

    /* GET */

    app.get('/estoque', (req, res) => {
        //modelo: ?page=1&limit=5
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit) 
        Estoque.lista(res, page, limit)
    })

    app.get('/estoque/:sbn', (req, res) => {
        const sbn = parseInt(req.params.sbn)
        Estoque.buscaPorSbn(sbn, res)
    })

    /* POST */

    app.post('/estoque', (req, res) => {
        var livro = req.body
        Estoque.adiciona(livro, res)
    })

    /* PATCH */

    app.patch('/estoque/:sbn', (req, res) => {
        var livro = req.body
        const sbn = parseInt(req.params.sbn)
        Estoque.atualizaPorSbn(sbn, livro, res)
    })

    /* DELETE */

    app.delete('/estoque/:sbn', (req, res) => {
        const sbn = parseInt(req.params.sbn)
        Estoque.removePorSbn(sbn, res)
    })

    module.exports = app