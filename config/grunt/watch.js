module.exports = {
  js: {
    files: ['src/*.js'],
    tasks: ['js', 'copy:build']
  },
  css: {
    files: ['src/*.css'],
    tasks: ['cssmin', 'copy:build']
  },
};