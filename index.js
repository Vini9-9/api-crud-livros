const app =  require('./controllers/servicoEstoque')
const conexaoBD = require('./infra/conexao')
const Tabelas = require('./infra/tabelas')

conexaoBD.connect((err) => {
    if(err){
        console.log(err) 
    } else {

        console.log('BD conectado com sucesso')
        Tabelas.init(conexaoBD)
        app.listen(4000, () => console.log("Rodando servidor na porta 4000"))
        
    }
})

module.exports = app