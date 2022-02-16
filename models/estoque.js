const conexaoBD = require('../infra/conexao')

class Estoque {
    adiciona(livro, res){

        const sbnEhValido = livro.sbn  
        const nomeEhValido = livro.nome  
        const autorEhValido = livro.autor 
        const estoqueEhValido = parseInt(livro.estoque) > 0 

        const validacoes = [
            {
                campo: 'SBN',
                valido: sbnEhValido,
                mensagem: 'SBN deve ser preenchido'
            },
            {
                campo: 'nome',
                valido: nomeEhValido,
                mensagem: 'Nome deve ser preenchido'
            },
            {
                campo: 'autor',
                valido: autorEhValido,
                mensagem: 'Autor deve ser preenchido'
            },
            {
                campo: 'estoque',
                valido: estoqueEhValido,
                mensagem: 'Estoque deve ser maior que 0'
            }
        ]
        
        const erros = validacoes.filter( campo => !campo.valido)
        const existeErro = erros.length
        
        if(existeErro){
            res.status(400).json(erros)
        } else {
            const sql = `INSERT INTO Livros SET ?`

            conexaoBD.query(sql, livro, (erro) => {
                erro ? res.status(400).json(erro) : res.status(201).json(livro)
            })

        }

        
    }


}

module.exports = new Estoque