const Joi = require('joi');

// Schema para cadastro de produto
const productSchema = Joi.object({
  descricao: Joi.string()
    .required()
    .messages({
      'string.base': 'A descrição deve ser um texto',
      'string.empty': 'A descrição é obrigatória',
      'any.required': 'A descrição é obrigatória'
    }),

  quantidade_estoque: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'A quantidade em estoque deve ser um número',
      'number.integer': 'A quantidade em estoque deve ser um número inteiro',
      'number.min': 'A quantidade em estoque não pode ser negativa',
      'any.required': 'A quantidade em estoque é obrigatória'
    }),

  valor: Joi.number()
    .precision(2)
    .min(0)
    .required()
    .messages({
      'number.base': 'O valor deve ser um número',
      'number.min': 'O valor não pode ser negativo',
      'number.precision': 'O valor deve ter no máximo 2 casas decimais',
      'any.required': 'O valor é obrigatório'
    }),

  categoria_id: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'A categoria deve ser um número',
      'number.integer': 'A categoria deve ser um número inteiro',
      'any.required': 'A categoria é obrigatória'
    })
});

// Schema para atualização de produto (permite campos opcionais)
const productUpdateSchema = Joi.object({
  descricao: Joi.string()
    .messages({
      'string.base': 'A descrição deve ser um texto',
      'string.empty': 'A descrição não pode ser vazia'
    }),

  quantidade_estoque: Joi.number()
    .integer()
    .min(0)
    .messages({
      'number.base': 'A quantidade em estoque deve ser um número',
      'number.integer': 'A quantidade em estoque deve ser um número inteiro',
      'number.min': 'A quantidade em estoque não pode ser negativa'
    }),

  valor: Joi.number()
    .precision(2)
    .min(0)
    .messages({
      'number.base': 'O valor deve ser um número',
      'number.min': 'O valor não pode ser negativo',
      'number.precision': 'O valor deve ter no máximo 2 casas decimais'
    }),

  categoria_id: Joi.number()
    .integer()
    .messages({
      'number.base': 'A categoria deve ser um número',
      'number.integer': 'A categoria deve ser um número inteiro'
    })
}).min(1).messages({
  'object.min': 'É necessário informar ao menos um campo para atualização'
});

module.exports = {
  productSchema,
  productUpdateSchema
};
