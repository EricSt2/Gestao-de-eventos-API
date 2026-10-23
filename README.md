Aluno: Eric Matheus da Silva Temoteo
Matrícula: 2022010143

API RESTful - Sistema de Gestão de Eventos

Aplicação backend para gestão de eventos e inscrições desenvolvida para a avaliação da AP1 (Unicatólica - Quixadá).

🚀 Tecnologias Utilizadas

Node.js

Express (Framework Web)

Sequelize (ORM)

SQLite (Banco de Dados)

Joi (Validação de dados)

📌 Funcionalidades

POST /events: Criação de novos eventos (valida título, data ISO e capacidade mínima de 1 vaga).

GET /events: Listagem de eventos com contagem em tempo real de participantes inscritos.

POST /events/:id/register: Inscrição de participantes em um evento (valida nome e e-mail, e impede inscrições se o evento atingir a capacidade máxima).

🛠️ Como Executar o Projeto

Clone o repositório:

git clone https://github.com/EricSt2/Gestao-de-eventos-API
cd api


Instale as dependências:

npm install


Inicie o servidor:

node server.js


O servidor estará rodando em http://localhost:3000.

🧪 Testes

Você pode utilizar clientes HTTP como Postman, Insomnia ou Thunder Client para testar as rotas da API.
