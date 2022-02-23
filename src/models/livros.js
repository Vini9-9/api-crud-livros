'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Livros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Livros.init({
    isbn: DataTypes.STRING,
    nome: DataTypes.STRING,
    autor: DataTypes.STRING,
    descricao: DataTypes.STRING,
    estoque: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Livros',
  });
  return Livros;
};