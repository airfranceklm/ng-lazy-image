module.exports = {
	minify: {
		expand: true,
		cwd: 'src/',
		src: ['*.css', '!*.min.css'],
		dest: 'dist',
		ext: '.min.css'
	}
};