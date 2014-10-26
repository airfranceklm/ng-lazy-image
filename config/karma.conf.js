module.exports = function (config) {
    config.set({

        basePath : '../',

        files : [
            //'bower_components/angular/angular.js',
            //'bower_components/angular-mocks/angular-mocks.js',
            'src/lib/angular.min.js',
            'src/lib/angular-mocks.js',
            'dist/lazy-image.js',
            'test/unit/**/*.js',
            {
                pattern: 'src/img/*.png',
                watched: false,
                included: false,
                served: true
            },
        ],

        // prevent image warning in our tests
        proxies: {
            '/img/': '/img/'
        },

        exclude: [
            // 'src/app/js/lib/*.js'
        ],

        autoWatch : true, // DEVELOPMENT
        // singleRun: true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        // browsers : ['PhantomJS'], // BAMBOO HEADLESS

        plugins : [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-ie-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-junit-reporter'
        ],

        reporters: ['dots', 'coverage', 'junit'],

        preprocessors : {
            'src/lazy-image.js': ['coverage']
        },

        coverageReporter : {
            type : 'lcov',
            dir : 'target/karma-coverage',
            file : 'coverage.html'
        },

        junitReporter : {
            outputFile: 'target/TESTS-unit.xml',
            suite: 'unit'
        },

        customLaunchers: {
            IE9: {
                base: 'IE',
                'x-ua-compatible': 'IE=EmulateIE9'
            },
            IE8: {
                base: 'IE',
                'x-ua-compatible': 'IE=EmulateIE8'
            }
        }

    });
};