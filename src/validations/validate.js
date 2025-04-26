const { ValidationError } = require('../middleware/error/errorHandler');
const { logger } = require('../utils/logger');
const { userSchema, loginSchema, userUpdateSchema } = require('./schemas/userSchema');
const { clientSchema, clientUpdateSchema } = require('./schemas/clientSchema');
const { productSchema, productUpdateSchema } = require('./schemas/productSchema');
const { orderSchema } = require('./schemas/orderSchema');

/**
 * Middleware factory para validação de dados usando Joi
 * @param {Object} schema - Schema Joi para validação
 * @param {string} source - Fonte dos dados a serem validados (body, params, query)
 * @returns {Function} Middleware de validação Express
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      logger.debug(`Erro de validação: ${JSON.stringify(errors)}`);
      
      // Responde com erro 400 e detalhes de validação
      return next(new ValidationError('Erro de validação', errors));
    }

    // Dados validados substituem os originais
    req[source] = value;
    return next();
  };
};

module.exports = {
  validateUser: validate(userSchema),
  validateLogin: validate(loginSchema),
  validateUserUpdate: validate(userUpdateSchema),
  validateClient: validate(clientSchema),
  validateClientUpdate: validate(clientUpdateSchema),
  validateProduct: validate(productSchema),
  validateProductUpdate: validate(productUpdateSchema),
  validateOrder: validate(orderSchema)
};
