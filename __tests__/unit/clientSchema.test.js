const { clientSchema, clientUpdateSchema } = require('../../src/validations/schemas/clientSchema');

describe('Client Schema Validation', () => {
  describe('clientSchema', () => {
    it('should validate a valid client with all fields', () => {
      const client = {
        nome: 'Cliente Teste',
        email: 'cliente@teste.com',
        cpf: '529.982.247-25', // CPF válido
        cep: '12345-678',
        rua: 'Rua Exemplo',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP'
      };
      
      const { error } = clientSchema.validate(client);
      expect(error).toBeUndefined();
    });
    
    it('should validate a valid client with only required fields', () => {
      const client = {
        nome: 'Cliente Teste',
        email: 'cliente@teste.com',
        cpf: '529.982.247-25' // CPF válido
      };
      
      const { error } = clientSchema.validate(client);
      expect(error).toBeUndefined();
    });

    it('should reject invalid CPF', () => {
      const client = {
        nome: 'Cliente Teste',
        email: 'cliente@teste.com',
        cpf: '111.111.111-11' // CPF inválido
      };
      
      const { error } = clientSchema.validate(client);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('CPF inválido');
    });

    it('should reject invalid CEP format', () => {
      const client = {
        nome: 'Cliente Teste',
        email: 'cliente@teste.com',
        cpf: '529.982.247-25',
        cep: '123456' // CEP inválido
      };
      
      const { error } = clientSchema.validate(client);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('CEP');
    });
    
    it('should reject invalid estado length', () => {
      const client = {
        nome: 'Cliente Teste',
        email: 'cliente@teste.com',
        cpf: '529.982.247-25',
        estado: 'SAO' // Estado deve ter 2 caracteres
      };
      
      const { error } = clientSchema.validate(client);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('estado');
    });
  });

  describe('clientUpdateSchema', () => {
    it('should validate valid partial update', () => {
      const update = {
        nome: 'Novo Nome',
        email: 'novo@email.com'
      };
      
      const { error } = clientUpdateSchema.validate(update);
      expect(error).toBeUndefined();
    });
    
    it('should reject update with invalid email', () => {
      const update = {
        email: 'email_invalido'
      };
      
      const { error } = clientUpdateSchema.validate(update);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('email');
    });
    
    it('should reject update with invalid CPF', () => {
      const update = {
        cpf: '111.111.111-11' // CPF inválido
      };
      
      const { error } = clientUpdateSchema.validate(update);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('CPF inválido');
    });
    
    it('should reject empty update object', () => {
      const update = {};
      
      const { error } = clientUpdateSchema.validate(update);
      expect(error).toBeDefined();
      expect(error.message).toContain('informar ao menos um campo');
    });
  });
});
