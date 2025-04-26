# API PDV (Ponto de Venda)

![Node.js](https://img.shields.io/badge/Node.js-v20.15.0-green)
![Express](https://img.shields.io/badge/Express-v4.19.2-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v8.12.0-blue)
![JWT](https://img.shields.io/badge/JWT-v9.0.2-red)
![Licença](https://img.shields.io/badge/Licença-MIT-yellow)

API RESTful para um sistema de Ponto de Venda (PDV) completo que gerencia usuários, produtos, clientes, pedidos e categorias. Desenvolvida com Node.js, Express e PostgreSQL, esta API inclui autenticação JWT, upload de imagens, validação de dados e documentação Swagger.

![PDV API](https://i.imgur.com/0TtdLPJ.png)

## 📋 Funcionalidades

- **Autenticação e Autorização**:
  - Sistema de cadastro e login de usuários
  - Proteção de rotas com JWT (JSON Web Tokens)
  - Gerenciamento de perfil de usuário

- **Gerenciamento de Produtos**:
  - CRUD completo para produtos
  - Upload e armazenamento de imagens na nuvem (Supabase Storage)
  - Controle de estoque integrado
  - Categorização de produtos

- **Cadastro de Clientes**:
  - CRUD completo para clientes
  - Validação de CPF
  - Busca automática de endereço por CEP
  - Histórico de compras

- **Processamento de Pedidos**:
  - Criação e listagem de pedidos
  - Cálculo automático de valores
  - Atualização automática de estoque
  - Validação de disponibilidade

## 🛠️ Tecnologias

### Backend e Servidor
- **Node.js** - Ambiente de execução JavaScript server-side
- **Express.js** - Framework web minimalista e flexível
- **Winston** - Sistema de log estruturado e multinível

### Banco de Dados
- **PostgreSQL** - Banco de dados relacional robusto
- **Knex.js** - Query builder SQL flexível e intuitivo

### Segurança
- **JWT (JSON Web Tokens)** - Autenticação via tokens
- **Bcrypt** - Criptografia segura de senhas
- **Helmet** - Proteção para cabeçalhos HTTP
- **CORS** - Controle de acesso entre origens

### Armazenamento e Upload
- **Multer** - Middleware para upload de arquivos
- **Supabase Storage** - Armazenamento de imagens na nuvem
- **AWS SDK** - Integração com serviços de armazenamento

### Validação e Processamento
- **Joi** - Validação de dados e schemas
- **CPF-CNPJ-Validator** - Validação de documentos brasileiros
- **Axios** - Cliente HTTP para integração com APIs externas

### Documentação
- **Swagger/OpenAPI** - Documentação interativa da API
- **JSDoc** - Documentação de código inline

### Testes e Qualidade de Código
- **Jest** - Framework de testes
- **SuperTest** - Testes de API
- **ESLint** - Linting e padronização de código

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js v16.x ou superior
- PostgreSQL v12.x ou superior
- Conta no Supabase para armazenamento de imagens (opcional)

### Passo a Passo

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/marcopezzote/api-pdv-port.git
   cd api-pdv-port
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   ```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env` com suas credenciais:
   ```
   # Servidor
   PORT=3000
   
   # Banco de Dados PostgreSQL
   DB_HOST=seu_host
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   DB_DATABASE=pdv
   DB_PORT=5432
   
   # JWT
   JWT_SECRET=sua_chave_secreta
   
   # Supabase Storage
   SUPABASE_URL=sua_url
   SUPABASE_BUCKET=seu_bucket
   SUPABASE_REGION=sua_regiao
   SUPABASE_KEY=sua_chave
   SUPABASE_SECRET_KEY=sua_chave_secreta
   ```

4. **Prepare o banco de dados**:
   ```bash
   # Crie o banco de dados e tabelas
   psql -U seu_usuario -f src/schema.sql
   
   # Popule o banco com dados iniciais (opcional)
   npm run seed
   ```

5. **Inicie o servidor**:
   ```bash
   # Ambiente de desenvolvimento com hot reload
   npm run dev
   
   # Ambiente de produção
   npm run start
   ```

6. **Verifique o funcionamento**:
   ```bash
   curl http://localhost:3000/health
   ```

### Setup Rápido (Desenvolvimento)

Para configurar rapidamente o ambiente de desenvolvimento:
```bash
npm run setup
```
Este comando instala dependências, configura o banco de dados e popula dados de teste.

## 📚 Documentação da API

### Interface Swagger

A documentação interativa completa da API está disponível através do Swagger UI:

```
http://localhost:3000/api-docs
```

![Swagger UI](https://i.imgur.com/JnMk3Ie.png)

A interface Swagger permite:
- Visualizar todos os endpoints disponíveis
- Testar requisições diretamente no navegador
- Verificar modelos de dados e exemplos de resposta
- Realizar autenticação e testar endpoints protegidos

### 🔑 Endpoints Principais

## Sistema de Autenticação e Usuários

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/usuario` | Cadastra novo usuário | Não |
| `POST` | `/login` | Realiza login e retorna token JWT | Não |
| `GET` | `/usuario` | Obtém dados do usuário logado | Sim |
| `PUT` | `/usuario` | Atualiza dados do usuário | Sim |

### Exemplo de cadastro de usuário:
```json
// POST /usuario
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123"
}
```

## Gerenciamento de Produtos

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/produto` | Lista todos os produtos | Sim |
| `GET` | `/produto/:id` | Detalhes de um produto específico | Sim |
| `POST` | `/produto` | Cadastra novo produto com imagem | Sim |
| `PUT` | `/produto/:id` | Atualiza um produto existente | Sim |
| `DELETE` | `/produto/:id` | Remove um produto | Sim |

### Exemplo de cadastro de produto:
```json
// POST /produto - multipart/form-data
{
  "descricao": "Smartphone XYZ",
  "quantidade_estoque": 10,
  "valor": 129990, // em centavos (R$ 1.299,90)
  "categoria_id": 2,
  "produto_imagem": [arquivo de imagem]
}
```

## Gerenciamento de Clientes

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/cliente` | Lista todos os clientes | Sim |
| `GET` | `/cliente/:id` | Detalhes de um cliente específico | Sim |
| `POST` | `/cliente` | Cadastra novo cliente | Sim |
| `PUT` | `/cliente/:id` | Atualiza um cliente existente | Sim |

### Exemplo de cadastro de cliente:
```json
// POST /cliente
{
  "nome": "Maria Santos",
  "email": "maria@email.com",
  "cpf": "529.982.247-25",
  "cep": "01001-000",
  "rua": "Praça da Sé",
  "numero": "1",
  "bairro": "Sé",
  "cidade": "São Paulo",
  "estado": "SP"
}
```

## Gerenciamento de Pedidos

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/pedido` | Lista todos os pedidos | Sim |
| `POST` | `/pedido` | Cadastra novo pedido | Sim |

### Exemplo de cadastro de pedido:
```json
// POST /pedido
{
  "cliente_id": 1,
  "observacao": "Entrega rápida",
  "pedido_produtos": [
    {
      "produto_id": 1,
      "quantidade_produto": 2
    },
    {
      "produto_id": 3,
      "quantidade_produto": 1
    }
  ]
}
```

## Gerenciamento de Categorias

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/categoria` | Lista todas as categorias | Sim |

## Monitoramento e Diagnóstico

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/health` | Verifica o status da API e suas dependências | Não |

## 🧪 Testes

O projeto inclui testes unitários e de integração usando Jest:

```bash
# Executar todos os testes
npm test

# Executar testes com watch mode
npm run test:watch

# Verificar cobertura de testes
npm run test:coverage
```

## 🔍 Estrutura do Projeto

```
api-pdv-port/
├── __tests__/            # Testes unitários e de integração
├── src/
│   ├── connection/       # Configuração de conexão com banco de dados
│   ├── controller/       # Controladores de rota
│   ├── middleware/       # Middlewares da aplicação
│   │   └── error/        # Tratamento de erros
│   ├── routes/           # Definição das rotas
│   ├── utils/            # Funções utilitárias
│   │   └── logger/       # Sistema de logs
│   ├── validations/      # Validação de dados
│   │   └── schemas/      # Esquemas de validação
│   ├── index.js          # Ponto de entrada da aplicação
│   └── schema.sql        # Esquema do banco de dados
└── swagger.json          # Documentação da API
```

## 🚀 Roadmap

Funcionalidades planejadas para o futuro:

- [ ] Implementação de sistema de pagamentos
- [ ] Dashboard administrativo
- [ ] Sistema de notificações por e-mail
- [ ] Relatórios de vendas e estoque
- [ ] Aplicativo mobile para consulta

## 👨‍💻 Autor

<img src="https://avatars.githubusercontent.com/u/12345678?v=4" width="100px" style="border-radius: 50%;"/>

**Marco Pezzote**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-marcopezzote-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/marcopezzote)
[![GitHub](https://img.shields.io/badge/GitHub-marcopezzote-black?style=for-the-badge&logo=github)](https://github.com/marcopezzote)

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um issue ou enviar um pull request.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Desenvolvido com ❤️ por Marco Pezzote
</p>
