// Configuração global para todos os testes
// Esta configuração será executada antes de cada teste

// Configura .env para ambiente de teste
process.env.NODE_ENV = 'test';

// Sobrescreve o console.log durante os testes para evitar poluição na saída
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Limpa todos os mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
});
