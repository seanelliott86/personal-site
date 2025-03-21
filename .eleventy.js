import { DateTime } from "luxon"
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"
import svgSprite from "eleventy-plugin-svg-sprite"
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import cssnano from 'cssnano';
import postcss from 'postcss';
const PORT = 8080 // use a port you are reasonably sure is not in use elsewhere

export default function (eleventyConfig) {
    eleventyConfig.addGlobalData('siteUrl', 'https://seanelliott.au');

    // GENERAL
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.addPassthroughCopy({ './src/favicon': '/' });
    eleventyConfig.addPassthroughCopy("./src/fonts");
    eleventyConfig.setBrowserSyncConfig({
        files: './public/css/**/*.css',
        open: 'local'
    });

    // SERVER
    eleventyConfig.setServerOptions({
        liveReload: true,
        watch: ['./public/css/**/*.css'],
        port: PORT,
    });

    // PLUGINS
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(svgSprite, {
        path: "./src/assets/icons",
        globalClasses: "svg-icon",
    });

    // FILTERS
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString({ year: 'numeric', month: 'long', day: 'numeric' })
    });
    eleventyConfig.addFilter("isBlogPost", function (url) {
        return url.startsWith('/blog/') && url !== '/blog/';
    });


    // SHORTCODES
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    eleventyConfig.addShortcode("icon", (name, extraClass) => {
        return `<svg class="svg-icon ${extraClass}" focusable="false" aria-hidden="true"><use xlink:href="#svg-${name}"></use></svg>`;
    });

    eleventyConfig.addShortcode("codepen", (url) => {
        const url_array = url.split("/");
        const profile_url_array = url_array.filter((string, index) => {
            return (index < (url_array.length - 2)) ? true : false
        })

        const username = profile_url_array[profile_url_array.length - 1];
        const user_profile = profile_url_array.join("/");
        const data_slug_hash = url_array[url_array.length - 1];

        return `<p class="codepen" data-height="600" data-default-tab="result" data-slug-hash="${data_slug_hash}" data-user="${username}" style="height: 571px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span><a href="${url}">See the pen</a> (<a href="${user_profile}">@${username}</a>) on <a href="https://codepen.io">CodePen</a>.</span></p><script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>`;
    });

    eleventyConfig.addFilter("inlineFontCSS", async function (code) {
        try {
            const result = await postcss([cssnano]).process(code, { from: undefined });
            const adjustedCSS = result.css.replace(/url\('\.\.\/fonts\//g, "url('/fonts/");
            return `<style>${result.css}</style>`;
        } catch (error) {
            console.error("Error minifying CSS:", error);
            return code;
        }
    });

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        outputDir: "./assets/uploads/",
        extensions: 'html',
        formats: ['avif'],
        widths: [300, 600, 800],
        defaultAttributes: {
            loading: 'lazy',
            sizes: '(min-width: 60em) 672px, 100vw',
            decoding: 'async',
        },
    });

    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
}