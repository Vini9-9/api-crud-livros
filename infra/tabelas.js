class Tabelas {
    init(conexao) {
        console.log('Tabelas foram chamadas')
        this.conexao = conexao

        const sql = `DESCRIBE Livros`

        this.conexao.query(sql, erro => {
            erro ? this.criarEstoque() : console.log('Tabela já criada') 
        })
    }

    criarEstoque() {
        const sql = `CREATE TABLE IF NOT EXISTS Livros 
        (sbn int NOT NULL,
            nome varchar(100) NOT NULL,
            autor varchar(100) NOT NULL,
            descricao varchar(50),
            estoque int NOT NULL,
        PRIMARY KEY(sbn))`

        this.conexao.query(sql, erro => {
            erro ? console.log(erro) : console.log('Tabela criada') 
        })

        this.popularEstoque()
    }

    popularEstoque() {
        const titulos = [
        "SOLID", "Node", "Java", "CSS", "Typescript", 
        "Angular", "Struts", "Banco de dados", "Excel", "VBA"
        ]

        let sql = `INSERT INTO Livros (sbn, nome, autor, descricao, estoque) VALUES `
        
        titulos.forEach( (titulo, index) => {
            sql = sql + `(${index}, '${titulo}', 'Criador do ${titulo}', 'Livro sobre ${titulo}', ${100}), `
        })

        const indexVirgula = sql.lastIndexOf(',')
        sql = sql.substring(0, indexVirgula) + ';'

        this.conexao.query(sql, erro => {
            erro ? console.log(erro) : console.log('Tabela populada') 
        })
    }
}

module.exports = new Tabelas