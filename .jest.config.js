module.exports = {
  verbose: true,

  setupFiles: ['./tests/setup.js'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  testPathIgnorePatterns: ['/pages/', '/dist/', '/lib/', '/esm/'],

  transform: {
    '^.+\\.tsx?$': ['babel-jest', { configFile: './tests/.babelrc.js' }],
  },

  testRegex: '.*\\.test\\.(j|t)sx?$',
  // testRegex: 'grid\\/.*\\.test\\.(j|t)sx?$',

  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    '!components/**/styles.{ts,tsx}',
    '!components/**/*types.{ts,tsx}',
    '!components/styles/*',
    '!components/index.ts',
    '!components/utils/*',
  ],

  // use codecov.io to block coverage decrease, sicne it's report is better
  // https://jestjs.io/docs/en/configuration#coveragethreshold-object
  // coverageThreshold: {
  //   global: {
  //     // meaning of each coverage
  //     // https://www.guru99.com/code-coverage.html
  //     branches: 96.1,
  //     functions: 99.15,
  //     lines: 100,
  //     statements: 98.78,
  //   },
  // },

  moduleNameMapper: {
    'tests/(.*)$': '<rootDir>/tests/$1',
    components: '<rootDir>/components/index.ts',
  },
}
