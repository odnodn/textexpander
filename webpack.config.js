var webpack = require('webpack');
module.exports = {
  entry: {
    mainIndex: ['webpack/hot/dev-server', './src/mainIndex.js'],
    searchIndex: ['webpack/hot/dev-server', './src/searchIndex.js'],
  },
  output: {
    path: __dirname + './public/built',
    filename: '[name].js',
    publicPath: 'http://localhost:8080/built/'
  },
  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:8080/built/'
  },
  module: {
   loaders: [
     { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] } },
     { test: /\.css$/, loader: 'style-loader!css-loader' },
     { test: /\.svg$/, loader: 'svg-inline-loader' },
     { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
   ]
  },
  plugins: [
     new webpack.HotModuleReplacementPlugin()
  ]
}
