/**
 * Script para popular o banco de dados com dados iniciais
 * Útil para demonstrações, desenvolvimento e testes
 */
require('dotenv').config();
const bcrypt = require('bcrypt');
const dataBase = require('./src/connection/connection');
const { logger } = require('./src/utils/logger');

/**
 * Insere os dados de teste no banco de dados
 */
const seed = async () => {
  try {
    logger.info('Iniciando processo de seed do banco de dados');

    // Verifica a conexão com o banco de dados
    await dataBase.raw('SELECT 1+1 AS result');
    logger.info('Conexão com o banco de dados estabelecida com sucesso');

    // Insere usuário administrador para demonstrações
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await dataBase('usuarios')
      .insert({
        nome: 'Administrador',
        email: 'admin@pdv.com',
        senha: hashedPassword
      })
      .onConflict('email')
      .merge()
      .returning('*');
      
    logger.info(`Usuário admin criado com ID: ${adminUser[0].id}`);

    // Insere alguns clientes de exemplo
    const clientes = [
      {
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        cpf: '529.982.247-25',
        cep: '01001-000',
        rua: 'Praça da Sé',
        numero: '1',
        bairro: 'Sé',
        cidade: 'São Paulo',
        estado: 'SP'
      },
      {
        nome: 'Maria Souza',
        email: 'maria@exemplo.com',
        cpf: '861.840.542-43',
        cep: '20040-001',
        rua: 'Av. Rio Branco',
        numero: '156',
        bairro: 'Centro',
        cidade: 'Rio de Janeiro',
        estado: 'RJ'
      }
    ];

    for (const cliente of clientes) {
      await dataBase('clientes')
        .insert(cliente)
        .onConflict('email')
        .merge()
        .returning('*');
    }

    logger.info(`${clientes.length} clientes de exemplo inseridos/atualizados`);

    // Insere alguns produtos de exemplo
    const produtos = [
      {
        descricao: 'Smartphone XYZ',
        quantidade_estoque: 20,
        valor: 1299.99,
        categoria_id: 2, // Celulares
        produto_imagem: 'https://www.example.com/images/smartphone.jpg'
      },
      {
        descricao: 'Notebook ABC',
        quantidade_estoque: 15,
        valor: 3499.99,
        categoria_id: 1, // Informática
        produto_imagem: 'https://www.example.com/images/notebook.jpg'
      },
      {
        descricao: 'Perfume DEF',
        quantidade_estoque: 30,
        valor: 199.99,
        categoria_id: 3, // Beleza e Perfumaria
        produto_imagem: 'https://www.example.com/images/perfume.jpg'
      }
    ];

    for (const produto of produtos) {
      await dataBase('produtos')
        .insert(produto)
        .onConflict('descricao')
        .merge()
        .returning('*');
    }

    logger.info(`${produtos.length} produtos de exemplo inseridos/atualizados`);
    logger.info('Seed concluído com sucesso!');
    
  } catch (error) {
    logger.error(`Erro durante o processo de seed: ${error.message}`);
    logger.debug(error.stack);
  } finally {
    // Encerra a conexão com o banco de dados
    await dataBase.destroy();
  }
};

// Executa o seed
seed();
