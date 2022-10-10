const { DateTime } = require("luxon")

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.setBrowserSyncConfig({
        files: './public/css/**/*.css',
        open: 'local'
    });

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
    });
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
}