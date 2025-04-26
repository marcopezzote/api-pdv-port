const Joi = require('joi');

// Schema para cadastro de usuário
const userSchema = Joi.object({
  nome: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'O nome deve ser um texto',
      'string.empty': 'O nome é obrigatório',
      'string.min': 'O nome deve ter no mínimo {#limit} caracteres',
      'string.max': 'O nome deve ter no máximo {#limit} caracteres',
      'any.required': 'O nome é obrigatório'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'O email deve ser um texto',
      'string.empty': 'O email é obrigatório',
      'string.email': 'O email deve ser um email válido',
      'any.required': 'O email é obrigatório'
    }),

  senha: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': 'A senha deve ser um texto',
      'string.empty': 'A senha é obrigatória',
      'string.min': 'A senha deve ter no mínimo {#limit} caracteres',
      'any.required': 'A senha é obrigatória'
    })
});

// Schema para login de usuário
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'O email deve ser um texto',
      'string.empty': 'O email é obrigatório',
      'string.email': 'O email deve ser um email válido',
      'any.required': 'O email é obrigatório'
    }),

  senha: Joi.string()
    .required()
    .messages({
      'string.base': 'A senha deve ser um texto',
      'string.empty': 'A senha é obrigatória',
      'any.required': 'A senha é obrigatória'
    })
});

// Schema para atualização de usuário
const userUpdateSchema = Joi.object({
  nome: Joi.string()
    .min(3)
    .max(100)
    .messages({
      'string.base': 'O nome deve ser um texto',
      'string.empty': 'O nome não pode ser vazio',
      'string.min': 'O nome deve ter no mínimo {#limit} caracteres',
      'string.max': 'O nome deve ter no máximo {#limit} caracteres',
    }),

  email: Joi.string()
    .email()
    .messages({
      'string.base': 'O email deve ser um texto',
      'string.empty': 'O email não pode ser vazio',
      'string.email': 'O email deve ser um email válido',
    }),

  senha: Joi.string()
    .min(6)
    .messages({
      'string.base': 'A senha deve ser um texto',
      'string.empty': 'A senha não pode ser vazia',
      'string.min': 'A senha deve ter no mínimo {#limit} caracteres',
    })
}).min(1).messages({
  'object.min': 'É necessário informar ao menos um campo para atualização'
});

module.exports = {
  userSchema,
  loginSchema,
  userUpdateSchema
};
