module.exports = {
  verbose: true,

  setupFiles: ['./tests/setup.js'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  testPathIgnorePatterns: ['/pages/', '/dist/', '/lib/'],

  transform: {
    '^.+\\.tsx?$': ['babel-jest', { configFile: './tests/.babelrc.js' }],
  },

  testRegex: '.*\\.test\\.(j|t)sx?$',
  // testRegex: 'grid\\/.*\\.test\\.(j|t)sx?$',

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
