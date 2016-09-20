// UTILS
var del = require('del');
var path = require('path');
var express = require('express');
var serveIndex = require('serve-index');

// GULP
var gulp = require('gulp');
var loadPlugins = require('gulp-load-plugins');

// WEBPACK & KARMA
var webpack = require('webpack');
var WebpackDevMiddleware = require('webpack-dev-middleware');

var config = require('./webpack.config.js');

// SETTINGS
var pluginSrc = './src',
    pluginDest = './build',
    examplesDest = 'examples';

var $ = loadPlugins();

// COMPILERS
var isProduction = process.env.NODE_ENV === 'production';

var webpackConfiguration = config({
  isProduction: isProduction,
  pluginSrc: pluginSrc,
  pluginDest: pluginDest
});

var webpackCompiler = webpack(webpackConfiguration);

// ENVIRONMENT  SETUP
process.env.BABEL_ENV = 'node';

gulp.task('default', ['build']);
gulp.task('build', ['build:browser']);

// BUILD: browser
gulp.task('build:browser', ['build:clean'], function (callback) {
  webpackCompiler.run(function (error, stats) {
    if (error) throw new $.util.PluginError('webpack', error);
    $.util.log('[webpack]', stats.toString({ colors: true }));
  });
});

// DEV MODE
gulp.task('dev', function () {
  var server = express();

  server.use(new WebpackDevMiddleware(webpackCompiler, {
    contentBase: examplesDest,
    publicPath: '/build/',

    stats: { colors: true }
  }));

  server.get('*', express.static(path.resolve(__dirname, examplesDest)));
  server.get('*', serveIndex(path.resolve(__dirname, examplesDest), { icons: true }));

  server.get('/vendor/whitestorm.js', function (req, res) {
    res.sendFile(path.resolve(__dirname, './node_modules/whitestormjs/build/whitestorm.js'));
  });

  server.listen(8080, 'localhost', function () {});
});

// CLEANING
gulp.task('build:clean', function (callback) {
  del([pluginDest + '/*.js', pluginDest + '/*.map', './lib/**/*.js', './lib/**/*.map', './lib/*']).then(function () {
    return callback();
  });
});
<% if (serve) { %>
// VENDOR
gulp.task('vendor', (callback) => {
  gulp.src('./node_modules/whitestormjs/build/whitestorm.js')
    .pipe(gulp.dest('./vendor/'));
});
<% } %>
// ERRORS
function makeBuildErrorHandler(taskName) {
  return function (_ref) {
    var name = _ref.name;
    var message = _ref.message;
    var codeFrame = _ref.codeFrame;

    $.util.log('[' + taskName + ']', $.util.colors.red(name) + ' ' + message + (codeFrame ? '\n' + codeFrame : ''));
    this.emit('end');
  };
}