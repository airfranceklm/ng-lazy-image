module.exports = {
    'build': {
        cwd: './src',
        src: ['lazy-image-style.css'],
        dest: './dist/',
        expand: true,
        flatten: true,
        filter: 'isFile'
    },
    'pages1': {
        cwd: './src',
        src: ['img/*', 'lib/*', '*.html', '*.css'],
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
        src: [
            'angular/angular.min.js',
            'angular/angular.min.js.map',
            'angular-mocks/angular-mocks.js'
        ],
        dest: './src/lib',
        expand: true,
        flatten: true,
        filter: 'isFile'
    }
};