exports.config = {

    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    multiCapabilities: [{
        'browserName': 'chrome',
        'platform': 'Windows 8.1',
        'version': '34',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'POC build CHROME ' + process.env.TRAVIS_BUILD_NUMBER
    }/*, {
        'browserName': 'internet explorer',
        "platform": "Windows 7",
        "version": "8",
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'POC build IE8 ' + process.env.TRAVIS_BUILD_NUMBER
    }/*, {
        'browserName': 'opera',
        'platform': 'Windows 7',
        'version': '12',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'POC build OPERA ' + process.env.TRAVIS_BUILD_NUMBER
    }
        'browserName': 'android',
        'platform': 'Linux',
        'version': '4.3',
        'device-type': 'tablet',
        'device-orientation': 'portrait',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'POC build ' + process.env.TRAVIS_BUILD_NUMBER
    }*/],



    chromeOnly: false,

    specs: [
        'e2e/*.js'
    ],

    baseUrl: 'http://localhost:8000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        // isVerbose: true,
        // showColors: true,
        includeStackTrace: true
    }
};
