/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  setupFiles: [
    "<rootDir>/jest/config.ts"
  ],
  rootDir: './src',
  globals: {
      "ts-jest": {
        "compiler": "ttypescript"
      }
    }
}
