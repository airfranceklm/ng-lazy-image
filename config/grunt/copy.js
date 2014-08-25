module.exports = {
    'build': {
        cwd: './src',
        src: ['lazy-image.js', 'lazy-image-style.css'],
        dest: './dist/',
        expand: true,
        flatten: true,
        filter: 'isFile'
    },
    'pages1': {
        cwd: './src',
        src: ['**/*'],
        dest: './target/gh-pages',
        expand: true,
        filter: 'isFile'
    },
    'pages2': {
        cwd: './dist',
        src: ['*min*'],
        dest: './target/gh-pages',
        expand: true,
        flatten: true,
        filter: 'isFile'
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