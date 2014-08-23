module.exports = {
    install: {
			options: {
			targetDir: './bower_components',
			layout: 'byComponent',
			install: true,
			verbose: false,
			cleanTargetDir: false,
			cleanBowerDir: false,
			bowerOptions: {
				forceLatest: true,
    			production: false
			}
		}
    }
};