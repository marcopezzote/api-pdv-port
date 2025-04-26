const dataBase = require('./connection/connection');
const { logger } = require('./utils/logger');

/**
 * Testa a conexão com o banco de dados
 * @returns {Promise<boolean>} Resultado do teste de conexão
 */
const testDatabaseConnection = async () => {
  try {
    // Tenta realizar uma consulta simples no banco de dados
    await dataBase.raw('SELECT 1+1 AS result');
    logger.info('Conexão com o banco de dados estabelecida com sucesso!');
    return true;
  } catch (error) {
    logger.error('Erro ao conectar com o banco de dados: ' + error.message);
    logger.debug(error.stack);
    return false;
  }
};

module.exports = { testDatabaseConnection };
