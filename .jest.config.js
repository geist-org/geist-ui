module.exports = {
  verbose: true,

  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['./tests/setup.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  testPathIgnorePatterns: ['/pages/', '/dist/', '/lib/', '/esm/'],

  transform: {
    '^.+\\.tsx?$': ['babel-jest', { configFile: './tests/.babelrc.js' }],
  },

  testRegex: '.*\\.test\\.(j|t)sx?$',
  // testRegex: 'modal\\/.*\\.test\\.(j|t)sx?$',

  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    '!components/**/styles.{ts,tsx}',
    '!components/**/*types.{ts,tsx}',
    '!components/use-theme/*',
    '!components/use-all-themes/*',
    '!components/themes/*',
    '!components/geist-provider/*',
    '!components/index.ts',
    '!components/utils/**/*',
  ],

  moduleNameMapper: {
    'tests/(.*)$': '<rootDir>/tests/$1',
    components: '<rootDir>/components/index.ts',
  },
}
