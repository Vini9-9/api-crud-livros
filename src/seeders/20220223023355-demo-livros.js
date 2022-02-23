'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const titulos = [
      "SOLID", "Node", "Java", "CSS", "Typescript", 
      "Angular", "Struts", "Banco de dados", "Excel", "VBA"
      ]
    
    let livros = []

    titulos.forEach( (titulo, index) => {
      let livro = {
        isbn: index,
        nome: titulo,
        autor: `Criador do ${titulo}'`,
        descricao: `Livro sobre ${titulo}`,
        estoque: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      livros.push(livro)
    })

    await queryInterface.bulkInsert('Livros', livros , {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Livros', null, {});
     
  }
};
