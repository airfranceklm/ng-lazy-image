exports.config = {

    allScriptsTimeout: 11000,
  
    specs: [
        'e2e/*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
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
