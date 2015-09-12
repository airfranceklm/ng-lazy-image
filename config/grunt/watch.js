module.exports = {
  js: {
    files: ['src/*.js'],
    tasks: ['js', 'copy:build']
  },
  css: {
    files: ['src/*.css'],
    tasks: ['cssmin', 'copy:build']
  },
  sample: {
    files: ['sample/css/*.css', 'sample/*.html'],
    tasks: []
  },
  livereload: {
    options: { livereload: true },
    files: ['src/*.css', 'src/*.js'],
  }
};