exports.config = {

    allScriptsTimeout: 11000,
    

    specs: [
        '../test/e2e/*.js'
    ],

    multiCapabilities: [{
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['show-fps-counter=true', 'test-type']
        }
    }/*,{
        'browserName': 'firefox'
    },{
        'browserName': 'internet explorer'
    }*/],

    // browsers: ['chrome'],

    // chromeOnly: true,

    baseUrl: 'http://localhost:8000/',
    // baseUrl: 'http://afklm.github.io/ng-lazy-image/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000,
        // isVerbose: true,
        // showColors: true,
        includeStackTrace: true
    }
};
