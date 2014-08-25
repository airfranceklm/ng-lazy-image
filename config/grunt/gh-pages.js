module.exports = {
    options: {
        base: 'target/gh-pages',
        message: 'Updating version <%= package.version %>'
    },
    src: ['**']
};