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
    unitIE8: {
        configFile: 'config/karma.conf.js',
        singleRun: true,
        browsers: ['IE8']
    },
    unitIE9: {
        configFile: 'config/karma.conf.js',
        singleRun: true,
        browsers: ['IE9']
    },
    browser: {
        singleRun: false,
        browsers: ['Chrome']
    }
};