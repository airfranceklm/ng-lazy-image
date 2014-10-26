module.exports = {
    options: {
        singleQuotes: true,
    },
    app: {
        files: {
            'release/lazy-image.js': [
                'src/lazy-image.module.js',
                'src/lazy-image.service.js',
                'src/lazy-image.directive.js'
            ]
        }
    }
};