const Joi = require('joi');
const { cpf } = require('cpf-cnpj-validator');

// Schema para cadastro e atualização de cliente
const clientSchema = Joi.object({
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

  cpf: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!cpf.isValid(value)) {
        return helpers.message('CPF inválido');
      }
      return value;
    }, 'CPF validation')
    .messages({
      'string.base': 'O CPF deve ser um texto',
      'string.empty': 'O CPF é obrigatório',
      'any.required': 'O CPF é obrigatório'
    }),

  cep: Joi.string()
    .allow('', null)
    .pattern(/^[0-9]{5}-?[0-9]{3}$/)
    .messages({
      'string.pattern.base': 'O CEP deve estar no formato 99999-999 ou 99999999'
    }),

  rua: Joi.string().allow('', null),
  numero: Joi.string().allow('', null),
  bairro: Joi.string().allow('', null),
  cidade: Joi.string().allow('', null),
  estado: Joi.string().allow('', null)
    .length(2)
    .messages({
      'string.length': 'O estado deve ser informado com 2 caracteres (sigla)'
    })
});

// Schema para atualização de cliente (permite campos opcionais)
const clientUpdateSchema = Joi.object({
  nome: Joi.string()
    .min(3)
    .max(100)
    .messages({
      'string.base': 'O nome deve ser um texto',
      'string.min': 'O nome deve ter no mínimo {#limit} caracteres',
      'string.max': 'O nome deve ter no máximo {#limit} caracteres'
    }),

  email: Joi.string()
    .email()
    .messages({
      'string.base': 'O email deve ser um texto',
      'string.email': 'O email deve ser um email válido'
    }),

  cpf: Joi.string()
    .custom((value, helpers) => {
      if (!cpf.isValid(value)) {
        return helpers.message('CPF inválido');
      }
      return value;
    }, 'CPF validation')
    .messages({
      'string.base': 'O CPF deve ser um texto'
    }),

  cep: Joi.string()
    .allow('', null)
    .pattern(/^[0-9]{5}-?[0-9]{3}$/)
    .messages({
      'string.pattern.base': 'O CEP deve estar no formato 99999-999 ou 99999999'
    }),

  rua: Joi.string().allow('', null),
  numero: Joi.string().allow('', null),
  bairro: Joi.string().allow('', null),
  cidade: Joi.string().allow('', null),
  estado: Joi.string().allow('', null)
    .length(2)
    .messages({
      'string.length': 'O estado deve ser informado com 2 caracteres (sigla)'
    })
}).min(1).messages({
  'object.min': 'É necessário informar ao menos um campo para atualização'
});

module.exports = {
  clientSchema,
  clientUpdateSchema
};
