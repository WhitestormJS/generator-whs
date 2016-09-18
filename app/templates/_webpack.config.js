var path = require('path');
var webpack = require('webpack');

process.env.BABEL_ENV = 'browser';

module.exports = function config({isProduction, pluginSrc, pluginDest}) {
  console.log(isProduction ? 'Production mode' : 'Development mode');

  return {
    devtool: isProduction ? false : 'source-map',
    entry: `${pluginSrc}/index.js`,
    target: 'web',
    output: {
      path: path.join(__dirname, pluginDest),
      filename: '<%= filename %>',
      library: ['WHS', '<%= component %>'],
      libraryTarget: 'umd'
    },
    externals: {
      whitestormjs: 'WHS',
      three: 'THREE',
      'whitestormjs/physics/index': 'Physijs'
    },
    plugins: isProduction
    ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        minimize: true
      }),
    ]
    : []
  };
}
