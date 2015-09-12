module.exports = {
  dist: {
    options: {
      patterns: [
        {
          match: /lazy-image\.js/g,
          replacement: 'lazy-image.min.js'
        }
      ]
    },
    files: [
      {
        expand: true,
        flatten: true,
        src: ['target/gh-pages/*.html'],
        dest: 'target/gh-pages/'
      }
    ]
  }
} 