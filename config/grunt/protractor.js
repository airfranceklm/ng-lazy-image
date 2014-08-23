module.exports = {
    options: {
        keepAlive: false,
        noColor: false,
        args: { }
    },

    dev: {
        options: {
            configFile: "config/protractor-grunt.js",
            args: { }
        }
    },

    sauce: {
        options: {
            configFile: "config/sauce-e2e.conf.js",
            args: { }
        }
    }
};