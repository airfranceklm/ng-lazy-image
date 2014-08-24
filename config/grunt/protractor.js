module.exports = {
    options: {
        keepAlive: false,
        noColor: false,
        args: { }
    },

    chrome: {
        options: {
            configFile: "config/protractor-chrome.js",
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