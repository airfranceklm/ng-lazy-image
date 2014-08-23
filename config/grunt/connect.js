module.exports = {
    options: {
        hostname: 'localhost',
        base: './src/'
    },
    test: {
        options: {
            port: 8000
        }
    },
    open: {
        options: {
            keepalive: true,
            open: true
        }
    }
};