exports.config = {

    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    multiCapabilities: [{
        'browserName': 'chrome',
        'platform': 'OS X 10.6',
        'version': '',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'AFKL-LAZY-IMAGE CHROME OSX ' + process.env.TRAVIS_BUILD_NUMBER
    }, {
        'browserName': 'internet explorer',
        'platform': 'Windows 8',
        'version': '10',
        'ignoreProtectedModeSettings': true,
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'AFKL-LAZY-IMAGE IE10 W8 ' + process.env.TRAVIS_BUILD_NUMBER
    }],


    chromeOnly: false,

    specs: [
        '../test/e2e/*.js'
    ],

    baseUrl: 'http://localhost:8000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000,
        // isVerbose: true,
        // showColors: true,
        includeStackTrace: true
    }
};
