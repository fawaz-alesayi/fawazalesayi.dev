module.exports = {
  preset: "ts-jest",
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|svelte)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.svelte$': ['svelte-jester', { preprocess: true }],
  },
  moduleNameMapper: {
    '@/src/(.*)': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  setupFiles: [
    "./setupJest.js"
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
