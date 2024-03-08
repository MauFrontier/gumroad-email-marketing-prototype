export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).+(ts|tsx|js)'],
  moduleNameMapper: {
    '\\.(css|scss|svg|png)$': '<rootDir>/src/utils/mocks/genericMock.tsx',
    '\\.svg(\\?react)?$': '<rootDir>/src/utils/mocks/svgrMock.tsx', // Map SVG imports to the mock
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
