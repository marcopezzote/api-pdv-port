/**
 * Rota para verificar o status da API e suas dependências
 */
const express = require('express');
const router = express.Router();
const dataBase = require('../connection/connection');
const { client } = require('../supabaseClient');
const { version } = require('../../package.json');
const { logger } = require('../utils/logger');

/**
 * @description Retorna informações sobre o status da API e suas dependências
 * @route GET /health
 * @access Public
 */
router.get('/', async (req, res) => {
  logger.debug('Verificando status da API');
  
  try {
    // Verifica a conexão com o banco de dados
    const dbStatus = { status: 'error', message: 'Não foi possível conectar ao banco de dados' };
    try {
      // Tenta realizar uma consulta simples
      await dataBase.raw('SELECT 1+1 AS result');
      dbStatus.status = 'ok';
      dbStatus.message = 'Conexão com o banco de dados estabelecida';
    } catch (dbError) {
      logger.error(`Erro ao verificar banco de dados: ${dbError.message}`);
      dbStatus.error = dbError.message;
    }

    // Verifica a conexão com o storage (Supabase)
    const storageStatus = { status: 'error', message: 'Não foi possível conectar ao storage' };
    try {
      // Apenas verifica se o client está configurado corretamente
      if (client && client.config) {
        storageStatus.status = 'ok';
        storageStatus.message = 'Client de storage configurado corretamente';
      }
    } catch (storageError) {
      logger.error(`Erro ao verificar storage: ${storageError.message}`);
      storageStatus.error = storageError.message;
    }

    // Responde com o status geral da API
    const apiStatus = {
      name: 'PDV API',
      version,
      status: 'online',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      uptime: `${Math.round(process.uptime())} segundos`,
      dependencies: {
        database: dbStatus,
        storage: storageStatus
      }
    };

    return res.json(apiStatus);
  } catch (error) {
    logger.error(`Erro ao verificar status da API: ${error.message}`);
    
    return res.status(500).json({
      status: 'error',
      message: 'Erro ao verificar o status da API',
      error: error.message
    });
  }
});

module.exports = router;
