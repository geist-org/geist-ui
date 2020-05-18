const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  
  devtool: 'source-map',
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  },
  
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(__dirname, './src/index.html') }),
  ],
  
  devServer: {
    host: '127.0.0.1',
    port: '3000',
    contentBase: './dist',
    hot: true,
    open: true,
  }
};
