exports.config = {

    allScriptsTimeout: 11000,

    // seleniumAddress: 'http://0.0.0.0:4444/wd/hub',

    specs: [
        '../test/e2e/*.js'
    ],

    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path':'./node_modules/karma-phantomjs-launcher/node_modules/phantomjs/bin/phantomjs',
        'phantomjs.cli.args':['--logfile=PATH', '--loglevel=DEBUG']
    },

    reporters: ['progress'],

    browsers: ['PhantomJS'],

    chromeOnly: false,

    baseUrl: 'http://localhost:8000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000,
        // isVerbose: true,
        // showColors: true,
        includeStackTrace: true
    }
};
