/**
 * Classe base para erros da aplicação
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Erro para recursos não encontrados
 */
class NotFoundError extends AppError {
  constructor(message = 'Recurso não encontrado') {
    super(message, 404);
  }
}

/**
 * Erro para falhas de validação
 */
class ValidationError extends AppError {
  constructor(message = 'Erro de validação', errors = []) {
    super(message, 400);
    this.errors = errors;
  }
}

/**
 * Erro para problemas de autenticação
 */
class AuthenticationError extends AppError {
  constructor(message = 'Não autorizado') {
    super(message, 401);
  }
}

/**
 * Erro para problemas de autorização
 */
class AuthorizationError extends AppError {
  constructor(message = 'Acesso negado') {
    super(message, 403);
  }
}

/**
 * Middleware para lidar com rotas não encontradas
 */
const notFoundHandler = (req, res, next) => {
  next(new NotFoundError(`Rota não encontrada: ${req.method} ${req.originalUrl}`));
};

/**
 * Middleware para tratamento de erros
 */
const errorHandler = (err, req, res, next) => {
  // Importa o logger aqui para evitar dependência circular
  const { logger } = require('../../utils/logger');
  
  // Define o status code padrão se não estiver definido
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';
  
  // Formata a resposta de erro
  const errorResponse = {
    status: 'error',
    message
  };

  // Adiciona detalhes de validação se disponíveis
  if (err instanceof ValidationError && err.errors) {
    errorResponse.errors = err.errors;
  }

  // Log de erro apropriado por nível de gravidade
  if (statusCode >= 500) {
    logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    logger.debug(err.stack);
    
    // Em produção, oculta detalhes internos do erro
    if (process.env.NODE_ENV === 'production') {
      errorResponse.message = 'Erro interno do servidor';
      delete errorResponse.errors;
    }
  } else {
    logger.warn(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  notFoundHandler,
  errorHandler
};
