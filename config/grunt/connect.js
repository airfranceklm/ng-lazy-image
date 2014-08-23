module.exports = {
    options: {
        hostname: 'localhost',
        base: ['./src/', './dist']
    },
    test: {
        options: {
            port: 8000
        }
    },
    open: {
        options: {
            livereload: true,
            // keepalive: true,
            open: true
        }
    }
};