module.exports = function (grunt) {
    var path = require('path');

    // grunt.option('force', true); // Only when you want to build no matter what
    // grunt.option('debug', true);

    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'config/grunt')
    });

};