

# Projeto de Estoque

Este projeto é uma aplicação para gerenciar um estoque de produtos. Ele inclui funcionalidades para adicionar, listar, atualizar e excluir produtos, além de autenticação de usuários.

## Tecnologias Utilizadas

- Node.js
- Sequelize (ORM para interação com o banco de dados)
- Express (Framework web para Node.js)
- bcryptjs (Para a criptografia de senhas)
- JWT (JSON Web Tokens para autenticação)

## Configuração do Projeto

1. **Instalação de Dependências:**

   ```bash
   npm install

    Configuração do Banco de Dados:

    Certifique-se de configurar corretamente as credenciais do banco de dados no arquivo db.js.

    Configuração do Ambiente:

    Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente, como o segredo do JWT.

Executando a Aplicação

bash

npm start

A aplicação estará disponível em http://localhost:3000.
Endpoints da API
Produtos

    POST /api/products - Cria um novo produto
    GET /api/products - Retorna todos os produtos
    GET /api/products/:id - Retorna um produto específico
    PUT /api/products/:id - Atualiza um produto
    DELETE /api/products/:id - Exclui um produto

Usuários

    POST /api/users/register - Registra um novo usuário
    POST /api/users/reset-password - Redefine a senha do usuário
    GET /api/users - Retorna todos os usuários (requer autenticação)
    GET /api/users/:userId - Retorna um usuário específico (requer autenticação)

Autenticação

    POST /api/auth/login - Realiza o login do usuário
    POST /api/auth/logout - Realiza o logout do usuário (requer autenticação)

Contribuindo

Sinta-se à vontade para contribuir para este projeto abrindo problemas ou enviando pull requests.
