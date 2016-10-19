module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: ['public/es6/**/*.spec.js', 'public/js/**/*.js'],
    browsers: [
      'Chrome'
    ]
  });
};