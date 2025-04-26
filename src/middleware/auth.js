require("dotenv").config();

const jwt = require("jsonwebtoken");
const knex = require("../connection/connection");
const { AuthenticationError } = require('./error/errorHandler');
const { logger } = require('../utils/logger');

/**
 * Middleware de autenticação JWT para rotas protegidas
 * 
 * @description Este middleware verifica se o usuário está autenticado através de um
 * token JWT válido no cabeçalho Authorization. Se o token for válido, os dados do usuário
 * são adicionados ao objeto de requisição (req.user) e a execução continua para o próximo middleware.
 * 
 * @param {Object} req - Objeto de requisição do Express
 * @param {Object} res - Objeto de resposta do Express
 * @param {Function} next - Função para passar o controle para o próximo middleware
 * @returns {void}
 * 
 * @throws {AuthenticationError} Se o token não for fornecido ou for inválido
 */
const authenticateUser = async (req, res, next) => {
  const { authorization } = req.headers;

  // Verifica se o cabeçalho de autorização está presente
  if (!authorization) {
    logger.warn(`Tentativa de acesso sem token de autorização: ${req.method} ${req.originalUrl}`);
    return res.status(401).json({
      message: "Não autorizado. Para acessar esse recurso, um token de autenticação válido deve ser enviado."
    });
  }

  try {
    // Extrai o token Bearer
    const token = authorization.replace('Bearer ', '').trim();
    
    // Verifica o token JWT
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    
    // Busca o usuário no banco de dados
    const verifyUser = await knex("usuarios").where("id", id).first();

    if (!verifyUser) {
      logger.warn(`Tentativa de acesso com token inválido (usuário não encontrado): ${req.method} ${req.originalUrl}`);
      return res.status(401).json({
        message: "Não autorizado. Para acessar esse recurso, um token de autenticação válido deve ser enviado."
      });
    }
    
    // Remove a senha dos dados do usuário antes de adicionar ao objeto de requisição
    const { senha: _, ...restUser } = verifyUser;
    req.user = restUser;

    logger.debug(`Usuário ${restUser.id} (${restUser.email}) autenticado com sucesso`);
    next();
  } catch (error) {
    logger.warn(`Erro na autenticação: ${error.message}`);
    return res.status(401).json({
      message: "Não autorizado. Para acessar esse recurso, um token de autenticação válido deve ser enviado."
    });
  }
};

module.exports = authenticateUser;
