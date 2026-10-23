const { Sequelize } = require('sequelize');

// Configura o Sequelize para usar o SQLite e criar o arquivo local database.sqlite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false // Desativa logs no terminal para manter tudo limpo
});

module.exports = sequelize;