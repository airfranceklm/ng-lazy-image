module.exports = {
    options: {
        keepAlive: false,
        noColor: false,
        args: { }
    },

    all: {
        options: {
            configFile: "config/protractor-all.js",
            args: { }
        }
    },

    ci: {
        options: {
            configFile: "config/protractor-phantom.js",
            args: { }
        }
    },

    sauce: {
        options: {
            configFile: "config/protractor-sauce.js",
            args: { }
        }
    }
};