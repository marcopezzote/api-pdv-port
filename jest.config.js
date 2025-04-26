module.exports = {
  // Diretório raiz dos testes
  testMatch: ['**/__tests__/**/*.test.js'],
  
  // Configuração do ambiente de teste
  testEnvironment: 'node',
  
  // Define cobertura de código
  collectCoverageFrom: ['src/**/*.js', '!src/index.js', '!**/node_modules/**'],
  
  // Define o limite mínimo de cobertura de código
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  
  // Configure a transformação de código se necessário
  transform: {},
  
  // Configuração para ignorar determinados padrões
  testPathIgnorePatterns: ['/node_modules/'],

  // Setup para os testes
  setupFilesAfterEnv: ['./__tests__/setup.js'],
  
  // Timeout para cada teste (30s)
  testTimeout: 30000,
  
  // Ambiente de teste personalizado
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  
  // Exibe informações detalhadas nos resultados dos testes
  verbose: true
};
