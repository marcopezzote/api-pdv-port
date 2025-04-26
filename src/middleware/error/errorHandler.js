/**
 * Middleware global para tratamento de erros
 * @param {Error} err - Objeto de erro
 * @param {Request} req - Requisição Express
 * @param {Response} res - Resposta Express
 * @param {NextFunction} next - Função next do Express
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  console.error(err.stack);

  // Verifica se é um erro conhecido
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: err.message,
      errors: err.errors || []
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'error',
      message: 'Não autorizado'
    });
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).json({
      status: 'error',
      message: 'Acesso negado'
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({
      status: 'error',
      message: err.message || 'Recurso não encontrado'
    });
  }

  // Erro de servidor para erros desconhecidos
  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor',
    // Em ambiente de produção, não retornar detalhes do erro para o cliente
    ...(process.env.NODE_ENV !== 'production' && { 
      detail: err.message,
      stack: err.stack 
    })
  });
};

/**
 * Middleware para lidar com rotas não encontradas
 * @param {Request} req - Requisição Express
 * @param {Response} res - Resposta Express
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Rota ${req.method} ${req.originalUrl} não encontrada`
  });
};

// Classes de erro personalizadas
class ValidationError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'Não autorizado') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Acesso negado') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

class NotFoundError extends Error {
  constructor(message = 'Recurso não encontrado') {
    super(message);
    this.name = 'NotFoundError';
  }
}

module.exports = {
  errorHandler,
  notFoundHandler,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError
};
