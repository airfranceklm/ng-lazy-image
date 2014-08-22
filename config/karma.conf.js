module.exports = function (config) {
    config.set({

        basePath : '../',

        files : [
            //'bower_components/angular/angular.js',
            //'bower_components/angular-mocks/angular-mocks.js',
            'src/lib/angular.min.js',
            'src/lib/angular-mocks.js',
            'src/lazy-image.js',
            'test/**/*.js'
        ],

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
        }

    });
};