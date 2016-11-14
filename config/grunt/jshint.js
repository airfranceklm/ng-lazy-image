module.exports = {
    files : ['src/*.js'],
    options : {
        jshintrc : true,
        jshintignore : '.jshintignore',
        reporter : require('jshint-stylish') // require('jshint-junit-reporter'),
        // reporterOutput : 'target/reports/jshint-result.xml'
    }
};