const { DateTime } = require("luxon")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.setBrowserSyncConfig({
        files: './public/css/**/*.css',
        open: 'local'
    });

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
    });

    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    eleventyConfig.addShortcode("codepen", function (url) {
        const url_array = url.split("/");
        const profile_url_array = url_array.filter((string, index) => {
            return (index < (url_array.length - 2)) ? true : false
        })

        const username = profile_url_array[profile_url_array.length - 1];
        const user_profile = profile_url_array.join("/");
        const data_slug_hash = url_array[url_array.length - 1];

        return `<p class="codepen" data-height="600" data-default-tab="result" data-slug-hash="${data_slug_hash}" data-user="${username}" style="height: 571px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span><a href="${url}">See the pen</a> (<a href="${user_profile}">@${username}</a>) on <a href="https://codepen.io">CodePen</a>.</span></p><script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>`;
    });

    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
}