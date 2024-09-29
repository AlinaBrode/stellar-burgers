module.exports = {
  // Other Jest configurations...
  preset: 'ts-jest', // If you're using ts-jest
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|jpeg|gif|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@ui(.*)$': '<rootDir>/src/components/ui$1',
    '^@utils-types$': '<rootDir>/src/utils/types.ts',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@slices(.*)$': '<rootDir>/src/services/slices$1',
    '^@selectors(.*)$': '<rootDir>/src/services/selectors$1',
    // Map CSS modules if needed
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  // Add any necessary transform settings
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  // Include additional Jest settings if required
};
