module.exports = function (config) {
    config.set({

        basePath : '../',

        files : [
            //'bower_components/angular/angular.js',
            //'bower_components/angular-mocks/angular-mocks.js',
            'sample/vendor/angular.min.js',
            'sample/vendor/angular-mocks.js',
            //'release/lazy-image.js',
            'src/lazy-image.module.js',
            'src/lazy-image.service.js',
            'src/lazy-image.directive.js',
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
            'src/*.js': ['coverage']
        },

        coverageReporter : {
            dir : 'target/karma-coverage',
            reporters: [{
                type : 'lcov',
                file : 'coverage.html'
            }, {
                type: 'text-summary',
                subdir: '.'
            }]
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
