module.exports = {
	minify: {
		expand: true,
		cwd: 'src/',
		src: ['*.css', '!*.min.css'],
		dest: 'release',
		ext: '.min.css'
	}
};