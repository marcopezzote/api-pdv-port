const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Verifica se o diretório de logs existe, se não, cria
const logDir = path.join(__dirname, '../../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Define o formato dos logs
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Define os níveis de log personalizados
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define a cor para os níveis de log no console
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Adiciona cores ao winston
winston.addColors(colors);

// Define o nível de log com base no ambiente
const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

// Cria a instância do logger
const logger = winston.createLogger({
  level,
  levels,
  format: logFormat,
  transports: [
    // Registra os logs em arquivos separados por nível
    new winston.transports.File({ 
      filename: path.join(logDir, 'error.log'), 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: path.join(logDir, 'combined.log') 
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ 
      filename: path.join(logDir, 'exceptions.log') 
    })
  ],
  rejectionHandlers: [
    new winston.transports.File({ 
      filename: path.join(logDir, 'rejections.log') 
    })
  ]
});

// Função para log de requisições HTTP
const httpLogger = (req, res, next) => {
  const startTime = new Date();
  
  // Quando a resposta terminar
  res.on('finish', () => {
    const duration = new Date() - startTime;
    
    logger.http(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms - ${req.ip}`
    );
  });

  next();
};

module.exports = { logger, httpLogger };
