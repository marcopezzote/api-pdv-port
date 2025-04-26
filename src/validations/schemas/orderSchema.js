const Joi = require('joi');

// Schema para validação de produtos em um pedido
const orderProductSchema = Joi.object({
  produto_id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'O ID do produto deve ser um número',
      'number.integer': 'O ID do produto deve ser um número inteiro',
      'number.positive': 'O ID do produto deve ser um número positivo',
      'any.required': 'O ID do produto é obrigatório'
    }),

  quantidade_produto: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'A quantidade deve ser um número',
      'number.integer': 'A quantidade deve ser um número inteiro',
      'number.positive': 'A quantidade deve ser um número positivo',
      'any.required': 'A quantidade é obrigatória'
    })
});

// Schema para cadastro de pedido
const orderSchema = Joi.object({
  cliente_id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'O ID do cliente deve ser um número',
      'number.integer': 'O ID do cliente deve ser um número inteiro',
      'number.positive': 'O ID do cliente deve ser um número positivo',
      'any.required': 'O ID do cliente é obrigatório'
    }),

  observacao: Joi.string()
    .allow('', null)
    .messages({
      'string.base': 'A observação deve ser um texto'
    }),

  pedido_produtos: Joi.array()
    .items(orderProductSchema)
    .min(1)
    .required()
    .messages({
      'array.base': 'Os produtos do pedido devem ser um array',
      'array.min': 'É necessário informar pelo menos um produto no pedido',
      'any.required': 'Os produtos do pedido são obrigatórios'
    })
});

module.exports = {
  orderSchema,
  orderProductSchema
};
