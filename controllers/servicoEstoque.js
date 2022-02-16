const configExpress = require('../config/configExpress')
const app = configExpress()

    /* GET */

    app.get('/estoque', (req, res) => res.send('Você está na rota de estoque'))

    /* POST */

    app.post('/estoque', (req, res) => {
        var livro = req.body
        console.log(livro)
    })

    module.exports = app