const express = require('express');
const sequelize = require('./database');
// Importamos os modelos para carregar os seus relacionamentos
const Event = require('./event');
const Registration = require('./registration');
const eventRoutes = require('./eventRoutes');

const app = express();
app.use(express.json());

app.use('/', eventRoutes);

// sequelize.sync() cria as tabelas no arquivo SQLite automaticamente
sequelize.sync().then(() => {
  console.log('Banco de dados e tabelas sincronizados com sucesso!');
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}).catch(err => {
  console.error('Erro ao conectar ao banco de dados:', err);
});