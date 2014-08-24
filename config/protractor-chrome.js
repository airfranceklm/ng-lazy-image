exports.config = {

    allScriptsTimeout: 11000,
  
    specs: [
        '../test/e2e/*.js'
    ],

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['show-fps-counter=true']
        }
    },

    browsers: ['chrome'],

    chromeOnly: true,

    baseUrl: 'http://localhost:8000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        // isVerbose: true,
        // showColors: true,
        includeStackTrace: true
    }
};
