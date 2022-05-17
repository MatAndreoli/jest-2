const path = require('path');

module.exports = {
    rootDir: path.resolve(__dirname, './'),
    verbose: true,
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
    ],
    globals: {},
    collectCoverage: true,
    coverageDirectory: './coverage',
    coverageReporters: ['text', 'clover', 'lcov'],
    collectCoverageFrom: [
      '**/src/**/*.js',
      '**/spec/**/*.js',
    ],
    moduleFileExtensions: [
      'js',
    ],
  };