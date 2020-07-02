module.exports = {
  collectCoverage: true,
  testPathIgnorePatterns: ['node_modules', 'templates', 'lib'],
  coverageThreshold: {
    // global: {
    //   branches: 60,
    //   lines: 70,
    //   statements: 80,
    //   functions: 80,
    // },
  },
  projects: ['<rootDir>/packages/*'],
};
