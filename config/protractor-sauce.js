exports.config = {

    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    multiCapabilities: [{
        'browserName': 'chrome',
        'platform': 'Windows 7',
        'version': '',
        'chromeOptions': {
            'args': ['test-type']
        },
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'AFKL-LAZY-IMAGE CHROME OSX ' + process.env.TRAVIS_BUILD_NUMBER
    }/*, {
        'browserName': 'internet explorer',
        'platform': 'ANY',
        'version': '10',
        'ignoreProtectedModeSettings': true,
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'AFKL-LAZY-IMAGE IE10 W8 ' + process.env.TRAVIS_BUILD_NUMBER
    }*/],


    chromeOnly: false,

    specs: [
        '../test/e2e/*.js'
    ],

    baseUrl: 'http://localhost:8000/',
    // baseUrl: 'http://afklm.github.io/ng-lazy-image/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        // isVerbose: true,
        // showColors: true,
        includeStackTrace: true
    }
};
