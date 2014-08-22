module.exports = {
    main: {
        options: {
            archive: 'target/archive-<%= package.version %>.zip'
        },
        files: [
            { expand: true, cwd: 'target/build/<%= package.version %>/', src: ['**'], dest: '/', dot: true }
        ]
    }
};