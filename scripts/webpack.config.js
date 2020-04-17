const fs = require('fs-extra')
const path = require('path')
const componentsPath = path.join(__dirname, '../components')

module.exports = async() => {
  const files = await fs.readdir(componentsPath)
  
  const components = await Promise.all(files.map(async name => {
    const comPath = path.join(componentsPath, name)
    const entry = path.join(comPath, 'index.ts')
    
    const stat = await fs.stat(comPath)
    if (!stat.isDirectory()) return null
    
    const hasFile = await fs.pathExists(entry)
    if (!hasFile) return null
    
    return { name, url: entry }
  }))
  
  const componentsEntries = components
    .filter(r => r)
    .reduce((pre, current) => {
      return Object.assign({}, pre, { [current.name]: current.url })
    }, { index: path.join(componentsPath, 'index.ts') })
  
  console.log(`\n${Object.keys(componentsEntries).length} Components in total have been collected.`)
  console.log('Bundle now...')

  return {
    mode: 'production',
    
    entry: componentsEntries,
    
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist'),
      library: '',
      libraryTarget: 'commonjs',
    },
    
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        components: componentsPath,
      },
    },
    
    externals: [
      {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
        },
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom',
        },
        // '/styled-jsx/': {
        //   root: '_JSXStyle',
        //   commonjs2: 'styled-jsx',
        //   commonjs: 'styled-jsx',
        //   amd: 'styled-jsx',
        // },
      },
      function(context, request, done) {
        if (/^styled-jsx/.test(request)){
          return done(null, 'commonjs ' + request)
        }
        done()
      },
    ],
    
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: ['styled-jsx/babel'],
          },
        },
      ],
    },
  }
}
