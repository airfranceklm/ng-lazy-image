module.exports = {
	options: {
		compress: {
			drop_console: true
		}
	},
    app: {
        files: {
            'dist/lazy-image.min.js': [
                'dist/lazy-image.js'
            ]
        }
    }
};