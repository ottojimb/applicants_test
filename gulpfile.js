var express = require('express');
var app = require('./app');
var port = process.env.PORT || 3000;
var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var protractor = require("gulp-protractor").protractor;
var karmaServer = require('karma').Server;

gulp.task('default', ['sass', 'es6toes5']);

gulp.task('es6toes5', () => {
    browserify([
        'public/es6/navbar.js', 
        'public/es6/config.js', 
        'public/es6/ajax.js'
    ])
    .transform(['babelify', {presets: ["es2015"]}])
    .bundle()
    .pipe(source('script.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(buffer());
});

gulp.task('sass', function () {
  return gulp.src('./public/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('run', function () {
    app.set('port', port);
    app.use('/public', express.static('public'));

    app.listen(port, function() {
    console.log('Liftit appliance test is available at http://localhost:' + port);
    }, false);
});

gulp.task('protractor', function () {
    return gulp.src(["./public/es6/**/*.e2e-spec.js"])
    .pipe(protractor({
        configFile: "protractor.conf.js",
        args: ['--baseUrl', 'http://localhost:8000']
    }))
    .on('error', function(e) { throw e; });
});

gulp.task('karma', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    //singleRun: true
  }, done).start();
});

gulp.task('test', ['run', 'karma', 'protractor']);