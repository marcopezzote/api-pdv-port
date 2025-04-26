const swaggerAutogen = require('swagger-autogen')();
const { version } = require('./package.json');

const outputFile = './swagger.json';
const endpointsFile = ['./src/routes/router.js'];

// Configuração do Swagger
const doc = {
  info: {
    title: 'API PDV - Sistema de Ponto de Venda',
    description: `
    # Documentação da API PDV (Ponto de Venda)
    
    Esta API fornece endpoints para gerenciamento completo de um sistema de Ponto de Venda,
    incluindo administração de usuários, produtos, clientes, pedidos e categorias.
    
    ## Autenticação
    
    A maioria dos endpoints requer autenticação usando um token JWT.
    Para obter um token, faça uma requisição para o endpoint \`/login\`.
    
    Para endpoints protegidos, inclua o token no cabeçalho da requisição:
    \`\`\`
    Authorization: Bearer seu_token_aqui
    \`\`\`
    
    ## Padrões de Resposta
    
    * **200 (OK)** - Requisição bem sucedida
    * **201 (Created)** - Recurso criado com sucesso
    * **400 (Bad Request)** - Dados inválidos ou campos faltando
    * **401 (Unauthorized)** - Token ausente ou inválido
    * **404 (Not Found)** - Recurso não encontrado
    * **500 (Internal Server Error)** - Erro no servidor
    
    ## Formatos
    
    * Valores monetários são representados em centavos (ex: R$ 10,90 = 1090)
    * Datas são representadas no formato ISO 8601
    * CPF pode ser formatado (123.456.789-00) ou não (12345678900)
    `,
    version,
    contact: {
      name: 'Marco Pezzote',
      url: 'https://github.com/marcopezzote',
      email: 'marco@exemplo.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  host: process.env.NODE_ENV === 'production' ? 'api-pdv-port.onrender.com' : 'localhost:3000',
  basePath: '/',
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http', 'https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Insira o token JWT precedido de "Bearer " (ex: Bearer seu_token_aqui)'
    }
  },
  definitions: {
    Usuario: {
      id: 1,
      nome: 'Nome do Usuário',
      email: 'usuario@exemplo.com',
      $senha: 'senha123' // $ indica campo privado, não retornado nas respostas
    },
    Login: {
      email: 'usuario@exemplo.com',
      senha: 'senha123'
    },
    LoginResponse: {
      token: 'JWT_TOKEN_AQUI'
    },
    Produto: {
      id: 1,
      descricao: 'Nome do Produto',
      quantidade_estoque: 10,
      valor: 1990,
      categoria_id: 1,
      produto_imagem: 'https://exemplo.com/imagem.jpg'
    },
    Cliente: {
      id: 1,
      nome: 'Nome do Cliente',
      email: 'cliente@exemplo.com',
      cpf: '529.982.247-25',
      cep: '01001-000',
      rua: 'Rua Exemplo',
      numero: '123',
      bairro: 'Bairro',
      cidade: 'Cidade',
      estado: 'UF'
    },
    Pedido: {
      id: 1,
      cliente_id: 1,
      observacao: 'Observação do pedido',
      valor_total: 5990,
      pedido_produtos: [
        {
          id: 1,
          pedido_id: 1,
          produto_id: 1,
          quantidade_produto: 2,
          valor_produto: 1990
        },
        {
          id: 2,
          pedido_id: 1,
          produto_id: 2,
          quantidade_produto: 1,
          valor_produto: 2010
        }
      ]
    },
    Categoria: {
      id: 1,
      descricao: 'Nome da Categoria'
    },
    Error: {
      status: 'error',
      message: 'Descrição do erro',
      errors: [
        {
          field: 'campo',
          message: 'mensagem detalhada'
        }
      ]
    }
  }
};

// Gera o arquivo swagger.json
swaggerAutogen(outputFile, endpointsFile, doc);