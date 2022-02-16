const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: 'sql10.freemysqlhosting.net',
    port: 3306,
    user: 'sql10473230',
    password: '',
    database: 'sql10473230' // estoque_livros
})

module.exports = conexao