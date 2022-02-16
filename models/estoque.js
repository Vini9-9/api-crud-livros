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

    removePorSbn(sbn, res){
        const sql = `DELETE FROM Livros WHERE sbn = ${sbn}`

        conexaoBD.query(sql, (erro, resultados) => {
            erro ? res.status(400).json(erro) : res.status(200).json(resultados)
        })
         
    }

    atualizaPorSbn(sbn, livro, res){
        const sql = `UPDATE Livros SET ? WHERE sbn = ${sbn}`

        const sbnEhValido = !livro.sbn
        sbn = parseInt(sbn)
        console.log("sbnEhValido", sbnEhValido)

        if(sbnEhValido){

            conexaoBD.query(sql, livro, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json({sbn, ...livro})
                } 
            })
        } else {
            res.status(400).json("{'mensagem': 'sbn não pode ser atualizado'}")
        }

        
    }

    lista(res, page, limit){
        const sql = `SELECT * FROM Livros`
        if(!page && !limit){
            page = 1
            limit = 20
        }
        conexaoBD.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                const firstIndex = (page - 1 ) * limit
                const lastIndex = page * limit
                const resultadosPagina = {}

                if(firstIndex > 0){

                    resultadosPagina.anterior = {
                        page: page - 1,
                        limit: limit
                    }
                }

                if(lastIndex < resultados.length){
                    // Correção do limite da última página
                    const totalProxPagina = lastIndex + limit;
                    if(totalProxPagina > resultados.length){
                        limit = totalProxPagina - resultados.length
                    }
                    resultadosPagina.proxima = {
                        page: page + 1,
                        limit: limit
                    }
                }

                const resultadosNomes = []

                resultados.forEach( resultado => {
                    resultadosNomes.push(resultado.nome)
                })

                resultadosPagina.resultados = resultadosNomes.slice(firstIndex, lastIndex)

                res.status(200).json(resultadosPagina)
            }
            
        })
    }

    buscaPorSbn(sbn, res){
        const sql = `SELECT * FROM Livros WHERE sbn = ${sbn}`

        conexaoBD.query(sql, (erro, resultados) => {
            erro ? res.status(400).json(erro) : res.status(200).json(resultados[0])
        })
    }


}

module.exports = new Estoque