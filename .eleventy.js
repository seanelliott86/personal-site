module.exports = function (eleventyConfig) {
    eleventyConfig.setBrowserSyncConfig({
        files: './public/css/**/*.css',
        open: 'local'
    });
    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
}