import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import localResolve from 'rollup-plugin-local-resolve'
import babel from 'rollup-plugin-babel'
import fs from 'fs-extra'
import path from 'path'

const root = path.join(__dirname, '../')
const componentsPath = path.join(root, 'components')
const distPath = path.join(root, 'dist')
const esmPath = path.join(root, 'esm')

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const plugins = [
  babel({
    exclude: 'node_modules/**',
    extensions,
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: ['styled-jsx/babel'],
    babelrc: false,
    sourcemap: false,
  }),
  localResolve(),
  nodeResolve({
    browser: true,
    extensions,
  }),
  commonjs(),
]

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}

const external = id => /^react|react-dom|next\/link/.test(id)

const cjsOutput = {
  format: 'cjs',
  exports: 'named',
  entryFileNames: '[name]/index.js',
  dir: distPath,
  manualChunks: id => {
    if (id.includes('node_modules/styled-jsx')) {
      return 'styled-jsx.cjs'
    }
  },
  chunkFileNames: '[name].js',
  globals,
  sourcemap: false,
}

const esmOutput = {
  format: 'es',
  entryFileNames: '[name]/index.js',
  dir: esmPath,
  manualChunks: id => {
    if (id.includes('node_modules/styled-jsx/server')) {
      return 'styled-jsx-server.es'
    }
    if (id.includes('node_modules/styled-jsx')) {
      return 'styled-jsx.es'
    }
  },
  chunkFileNames: '[name].js',
  globals,
}

export default (async () => {
  await fs.remove(distPath)
  await fs.remove(esmPath)
  const files = await fs.readdir(componentsPath)

  const components = await Promise.all(
    files.map(async name => {
      const unitPath = path.join(componentsPath, name)
      const entry = path.join(unitPath, 'index.ts')

      const stat = await fs.stat(unitPath)
      if (!stat.isDirectory()) return null

      const hasFile = await fs.pathExists(entry)
      if (!hasFile) return null

      return { name, url: entry }
    }),
  )
  console.log(
    `\n${Object.keys(components).length} Components in total have been collected.`,
  )

  return [
    // Bundle each component separately
    ...components
      .filter(r => !!r)
      .map(({ name, url }) => ({
        input: { [name]: url },
        // output: [esmOutput, cjsOutput],
        output: [cjsOutput],
        external,
        plugins,
      })),
    // Bundle for packages containing all components.
    {
      input: { index: path.join(componentsPath, 'index.ts') },
      output: [
        // {
        //   ...esmOutput,
        //
        //   entryFileNames: 'index.js',
        // },
        {
          ...cjsOutput,
          entryFileNames: 'index.js',
        },
      ],
      external,
      plugins,
    },
  ]
})()
