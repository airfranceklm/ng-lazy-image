module.exports = {
    coverage : {
        src: ['target/karma-coverage/PhantomJS*/lcov.info'],
        dest: 'target/karma-coverage/lcov.info',
        replacements: [
            {
                from : 'SF:./',
                to : 'SF:./'
            }
        ]
    }
};