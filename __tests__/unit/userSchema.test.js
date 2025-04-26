const { userSchema, loginSchema, userUpdateSchema } = require('../../src/validations/schemas/userSchema');

describe('User Schema Validation', () => {
  describe('userSchema', () => {
    it('should validate a valid user', () => {
      const user = {
        nome: 'Usuario Teste',
        email: 'usuario@teste.com',
        senha: 'senha123'
      };
      
      const { error } = userSchema.validate(user);
      expect(error).toBeUndefined();
    });

    it('should reject invalid email', () => {
      const user = {
        nome: 'Usuario Teste',
        email: 'email-invalido',
        senha: 'senha123'
      };
      
      const { error } = userSchema.validate(user);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('email');
    });

    it('should reject short password', () => {
      const user = {
        nome: 'Usuario Teste',
        email: 'usuario@teste.com',
        senha: '12345'
      };
      
      const { error } = userSchema.validate(user);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('senha');
    });

    it('should reject missing nome', () => {
      const user = {
        email: 'usuario@teste.com',
        senha: 'senha123'
      };
      
      const { error } = userSchema.validate(user);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('nome');
    });
  });

  describe('loginSchema', () => {
    it('should validate valid login credentials', () => {
      const credentials = {
        email: 'usuario@teste.com',
        senha: 'senha123'
      };
      
      const { error } = loginSchema.validate(credentials);
      expect(error).toBeUndefined();
    });

    it('should reject login with missing email', () => {
      const credentials = {
        senha: 'senha123'
      };
      
      const { error } = loginSchema.validate(credentials);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('email');
    });
  });

  describe('userUpdateSchema', () => {
    it('should validate partial update with valid data', () => {
      const update = {
        nome: 'Novo Nome'
      };
      
      const { error } = userUpdateSchema.validate(update);
      expect(error).toBeUndefined();
    });

    it('should validate complete update with valid data', () => {
      const update = {
        nome: 'Novo Nome',
        email: 'novo@email.com',
        senha: 'novasenha123'
      };
      
      const { error } = userUpdateSchema.validate(update);
      expect(error).toBeUndefined();
    });

    it('should reject update with invalid email', () => {
      const update = {
        email: 'email-invalido'
      };
      
      const { error } = userUpdateSchema.validate(update);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('email');
    });

    it('should reject empty update object', () => {
      const update = {};
      
      const { error } = userUpdateSchema.validate(update);
      expect(error).toBeDefined();
      expect(error.message).toContain('informar ao menos um campo');
    });
  });
});
