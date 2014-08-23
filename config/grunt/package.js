module.exports = {
    'build': {
        cwd: 'target/rjs',
        src: ['**'],
        dest: 'target/build/<%= package.version %>',
        expand: true
    },
    'full': {
        src: ['build/htaccess/one-year.txt'],
        dest: 'target/build/<%= package.version %>/.htaccess'
    },
    'api': {
        cwd: 'src/api',
        src: ['**'],
        dest: 'target/build/api',
        expand: true
    }
};