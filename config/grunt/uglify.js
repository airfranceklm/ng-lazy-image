module.exports = {
	options: {
		compress: {
			drop_console: true
		}
	},
    app: {
        files: {
            'release/lazy-image.min.js': [
                'release/lazy-image.js'
            ]
        }
    }
};