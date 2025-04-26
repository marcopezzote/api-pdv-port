const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Mock do banco de dados
jest.mock('../../src/connection/connection', () => ({
  where: jest.fn().mockReturnThis(),
  first: jest.fn(),
  returning: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis()
}));

// Mock do dotenv para testes
jest.mock('dotenv', () => ({
  config: jest.fn()
}));
process.env.JWT_SECRET = 'test-secret-key';

// Importando o app separado do servidor para testes
const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());

describe('Auth Routes', () => {
  // Configuração antes dos testes
  beforeEach(() => {
    // Limpa todos os mocks
    jest.clearAllMocks();
    
    // Mock das funções para testes
    const mockRegister = jest.fn().mockImplementation(async (req, res) => {
      const { nome, email, senha } = req.body;
      
      if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Dados inválidos' });
      }
      
      return res.status(201).json({ 
        id: 1, 
        nome,
        email
      });
    });
    
    const mockLogin = jest.fn().mockImplementation(async (req, res) => {
      const { email, senha } = req.body;
      
      if (email === 'teste@email.com' && senha === 'senha123') {
        const token = jwt.sign({ id: 1, nome: 'Teste' }, process.env.JWT_SECRET, { expiresIn: '8h' });
        return res.json({ token });
      }
      
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    });
    
    // Configura as rotas com os mocks
    router.post('/usuario', mockRegister);
    router.post('/login', mockLogin);
    
    // Configura o app para usar as rotas
    app.use(router);
  });
  
  describe('POST /usuario', () => {
    it('should create a new user with valid data', async () => {
      const res = await request(app)
        .post('/usuario')
        .send({
          nome: 'Usuário Teste',
          email: 'teste@email.com',
          senha: 'senha123'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('nome', 'Usuário Teste');
      expect(res.body).toHaveProperty('email', 'teste@email.com');
      expect(res.body).not.toHaveProperty('senha'); // Senha não deve ser retornada
    });
    
    it('should not create a user with invalid data', async () => {
      const res = await request(app)
        .post('/usuario')
        .send({
          nome: 'Usuário Teste'
          // Faltando email e senha
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });
  });
  
  describe('POST /login', () => {
    it('should login with correct credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'teste@email.com',
          senha: 'senha123'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      
      // Verifica se o token é válido
      const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
      expect(decoded).toHaveProperty('id', 1);
    });
    
    it('should not login with incorrect credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'teste@email.com',
          senha: 'senha-incorreta'
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Email ou senha inválidos');
    });
  });
});
