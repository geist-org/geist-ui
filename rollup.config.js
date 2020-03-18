import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import nodeResolve from '@rollup/plugin-node-resolve'
import localResolve from 'rollup-plugin-local-resolve'
import babel from "rollup-plugin-babel"
import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const plugins = [
  babel({
    exclude: "node_modules/**",
    extensions,
  }),
  localResolve(),
  nodeResolve({
    browser: true,
    extensions,
  }),
  commonjs(),
  // terser(),
]

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}

export default {
  input: 'components/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      globals,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      globals,
    },
    {
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
      globals,
      name: 'ZeitUI',
    },
  ],
  external: [
    'react',
    'react-dom',
  ],
  // external: id => /^react|react-dom|styled-jsx/.test(id),
  plugins: plugins,
}
