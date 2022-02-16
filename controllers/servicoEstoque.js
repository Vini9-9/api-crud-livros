const configExpress = require('../config/configExpress')
const app = configExpress()

    app.get('/estoque', (req, res) => res.send('Você está na rota de estoque'))

    module.exports = app