const Estoque = require('../models/estoque')
const configExpress = require('../config/configExpress')
const app = configExpress()

    /* GET */

    app.get('/estoque', (req, res) => res.send('Você está na rota de estoque'))

    /* POST */

    app.post('/estoque', (req, res) => {
        var livro = req.body
        Estoque.adiciona(livro, res)
    })

    /* DELETE */

    app.delete('/estoque/:sbn', (req, res) => {
        const sbn = parseInt(req.params.sbn)
        Estoque.removePorSbn(sbn, res)
    })

    module.exports = app