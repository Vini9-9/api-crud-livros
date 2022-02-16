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
                if(erro) {
                    
                    if(erro.code == 'ER_DUP_ENTRY'){
                        res.status(400).json({
                            "message": "SBN já está associado a outro livro"
                        })
                    } else {
                        res.status(400).json(erro)
                    }
                } else {
                    res.status(201).json(livro)
                }
            })

        }

    }

    removePorSbn(sbn, res){
        const sql = `DELETE FROM Livros WHERE sbn = ${sbn}`

        console.log("removePorSbn")

        var myRe = new RegExp("^[0-9]*$")
        const sbnEhValido = myRe.exec(sbn)
        if(!sbnEhValido){
            res.status(406).json({
                "message": "SBN deve ser um número"
            })
        } else {
            conexaoBD.query(sql, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                } else { 
                    if(resultados.affectedRows > 0){
                        res.status(200).json({
                            "sbn": sbn,
                            "message": "Deletado com sucesso"
                        })
                    } else {
                        res.status(404).json({
                            "message": "SBN não localizado"
                        })
                    }
                    
                    
                }
            })
        }
         
    }

    atualizaPorSbn(sbn, livro, res){
        const sql = `UPDATE Livros SET ? WHERE sbn = ${sbn}`


        var myRe = new RegExp("^[0-9]*$")
        const sbnEhValido = myRe.exec(sbn)
        const naoRecebeSbn = !livro.sbn
        const recebeEstoque = livro.estoque
        var estoqueEhValido = true

        if(recebeEstoque){
            estoqueEhValido = parseInt(livro.estoque) > 0 
        } 

        const validacoes = [
            {
                campo: 'sbn',
                valido: sbnEhValido,
                mensagem: 'SBN deve ser um número'
            },
            {
                campo: 'estoque',
                valido: estoqueEhValido,
                mensagem: 'Estoque deve ser maior que 0'
            },
            {
                campo: 'sbn url',
                valido: naoRecebeSbn,
                mensagem: 'SBN não pode ser atualizado'
            }
        ]
        
        const erros = validacoes.filter( campo => !campo.valido)
        const existeErro = erros.length

        
        sbn = parseInt(sbn)

        if(existeErro) {
            res.status(406).json(erros)
        } else {
            conexaoBD.query(sql, livro, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json({sbn, ...livro})
                } 
            })
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
                        limit = resultados.length - lastIndex
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
                
                resultadosPagina.totalPagina = resultadosPagina.resultados.length

                res.status(200).json(resultadosPagina)
            }
            
        })
    }

    buscaPorSbn(sbn, res){
        const sql = `SELECT * FROM Livros WHERE sbn = ${sbn}`

        var myRe = new RegExp("^[0-9]*$")
        const sbnEhValido = myRe.exec(sbn)

        if(sbnEhValido){
            conexaoBD.query(sql, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    if(resultados[0]){
                        res.status(200).json(resultados[0])
                    } else {
                        res.status(404).json({
                            "message": "SBN não localizado"
                        })
                    }
    
                } 
            })
        } else {
            res.status(406).json({
                "message": "SBN deve ser um número"
            })
        }

        
    }


}

module.exports = new Estoque