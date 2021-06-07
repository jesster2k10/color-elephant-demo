/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  verbose: process.env.NODE_ENV === 'development',
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/src/components$1',
    '^@/context(.*)$': '<rootDir>/src/context$1',
    '^@/interfaces(.*)$': '<rootDir>/src/interfaces$1',
    '^@/lib(.*)$': '<rootDir>/src/lib$1',
  },
  testEnvironment: 'jsdom',
};
