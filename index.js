const express = require('express') 

const app = express()

app.listen(4000, () => console.log('servidor rodando na porta 4000'))

app.get('/estoque', (req, res) => res.send('Você está na rota de estoque'))