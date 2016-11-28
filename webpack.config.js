//加载依赖
var webpack = require('webpack');

module.exports = {
  entry: {
    'app':'./build/app.js'
  },
  output: {
    path: './public/javascripts/__build__/',
    filename: '[name].min.js',
    publicPath: '/javascripts/__build__/'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-assign']
        }
      }
    ]
  },
  externals: {
    'electron':'electron'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"' //开发环境设置为development,运营环境设置为production
      }
    })
  ]
}