module.exports = {
    'build': {
        cwd: './src',
        src: ['lazy-image.js', 'lazy-image.min.js', 'lazy-image-style.css'],
        dest: './dist/',
        expand: true
    },
    'update': {
        cwd: './bower_components',
        src: ['angular/angular.min.js', 'angular-mocks/angular-mocks.js'],
        dest: './src/lib',
        expand: true,
        flatten: true,
        filter: 'isFile'
    }
};