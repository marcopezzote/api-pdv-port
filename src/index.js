require("dotenv").config();
const express = require("express");
const { router } = require("./routes/router");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const path = require("path");
const { errorHandler, notFoundHandler } = require("./middleware/error/errorHandler");
const { logger, httpLogger } = require("./utils/logger");

const app = express();

// Middleware para CORS
app.use(cors());

// Middleware para parsing JSON
app.use(express.json());

// Middleware para logs HTTP
app.use(httpLogger);

// Swagger para documentação da API
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(require("../swagger.json"))
);

// Rotas da API
app.use(router);

// Middleware para rotas não encontradas
app.use(notFoundHandler);

// Middleware global de tratamento de erros
app.use(errorHandler);

const { testDatabaseConnection } = require('./db');
const PORT = process.env.PORT || 3000;

// Inicia o servidor após verificar a conexão com o banco de dados
const startServer = async () => {
  try {
    // Testa a conexão com o banco de dados
    const dbConnected = await testDatabaseConnection();
    
    if (!dbConnected) {
      logger.warn('Servidor iniciado, mas há problemas com a conexão do banco de dados');
    }

    app.listen(PORT, () => {
      logger.info(`Servidor rodando na porta ${PORT}`);
      logger.info(`Documentação disponível em http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error(`Falha ao iniciar o servidor: ${error.message}`);
    process.exit(1);
  }
};

startServer();
