module.exports = {
    options: {
        configFile: "node_modules/protractor/referenceConf.js",
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