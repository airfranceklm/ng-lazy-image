module.exports = {
    options: {
        configFile: 'config/karma.conf.js',
        runnerPort: 9999,
        browsers: ['Chrome']
    },
    dev: {
        reporters: 'dots'
    },
    unit: {
        singleRun: true,
        browsers: ['PhantomJS']
    },
    browser: {
        singleRun: false,
        browsers: ['Chrome']
    }
};