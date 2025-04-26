# API PDV (Ponto de Venda)

API RESTful para um sistema de Ponto de Venda (PDV) que gerencia usuários, produtos, clientes, pedidos e categorias.

## 📋 Funcionalidades

- **Autenticação**: Cadastro, login e gerenciamento de usuários
- **Produtos**: CRUD completo, incluindo upload de imagens
- **Clientes**: CRUD completo com validação de CPF
- **Pedidos**: Criação e listagem de pedidos de venda
- **Categorias**: Listagem de categorias disponíveis

## 🛠️ Tecnologias

- **Node.js** - Ambiente de execução
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **Knex.js** - Query builder SQL
- **JWT** - Autenticação via tokens
- **Multer** - Upload de arquivos
- **Supabase Storage** - Armazenamento de imagens
- **Swagger** - Documentação da API
- **Joi/Yup** - Validação de dados
- **Bcrypt** - Criptografia de senhas

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/api-pdv-port.git
cd api-pdv-port
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env` com suas credenciais (use o `.env.example` como modelo):

```bash
cp .env.example .env
```

Execute as migrações do banco de dados:

```bash
node src/schema.sql
```

Inicie o servidor:

```bash
npm run dev  # Desenvolvimento
# ou
npm start    # Produção
```

## 📚 Documentação da API

A documentação da API está disponível em:

```
http://localhost:3000/api-docs
```

## 🔑 Endpoints principais

### Autenticação

- `POST /usuario` - Cadastro de usuário
- `POST /login` - Login de usuário (retorna token JWT)

### Produtos (requer autenticação)

- `GET /produto` - Lista todos os produtos
- `GET /produto/:id` - Detalhes de um produto
- `POST /produto` - Cadastra produto com imagem
- `PUT /produto/:id` - Atualiza produto
- `DELETE /produto/:id` - Remove produto

### Clientes (requer autenticação)

- `GET /cliente` - Lista todos os clientes
- `GET /cliente/:id` - Detalhes de um cliente
- `POST /cliente` - Cadastra cliente
- `PUT /cliente/:id` - Atualiza cliente

### Pedidos (requer autenticação)

- `GET /pedido` - Lista todos os pedidos
- `POST /pedido` - Cadastra pedido

### Categorias (requer autenticação)

- `GET /categoria` - Lista todas as categorias

## 👨‍💻 Autor

- Nome: Seu Nome
- LinkedIn: [Seu Perfil](https://linkedin.com/in/seu-perfil)
- GitHub: [Seu GitHub](https://github.com/seu-usuario)

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
