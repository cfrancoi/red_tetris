module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/src/__test__/__mocks__/styleMock.js',
    }
}