const app =  require('./controllers/servicoEstoque')

app.listen(4000, () => console.log('servidor rodando na porta 4000'))

module.exports = app