
# Sean Elliott - Personal Site 

My personal website, this is where I'll be writing and playing around with different ideas and techniques.
This is a constant work in-progress so always come back and have a look :)

[![Netlify Status](https://api.netlify.com/api/v1/badges/a2eeef8b-30c1-4430-8bfd-037c6b5a1930/deploy-status)](https://app.netlify.com/sites/graceful-jelly-7ecb2e/deploys)

## Tech Stack

**Hosting:** [Netlify](https://www.netlify.com/)

**CMS:** [Netlify CMS](https://www.netlifycms.org/)

**Static Site Generator:** [Eleventy (11ty)](https://11ty.dev/)

**Static Site Plugins/Shortcodes:**

- [eleventy-plugin-syntaxhighlight](https://github.com/11ty/eleventy-plugin-syntaxhighlight)
- [eleventy-plugin-svg-sprite](https://github.com/patrickxchong/eleventy-plugin-svg-sprite)
- [Shortcodes see below](](#11ty-shortcodes))

**Templating language:** [Nunjucks](https://mozilla.github.io/nunjucks/)

**Styling:**

- [SASS](https://sass-lang.com/)
- [modern-normalize](https://github.com/sindresorhus/modern-normalize)

**Node/Npm:** [npm-run-all](https://www.npmjs.com/package/npm-run-all)

**Icons Repo:** [Simple Icons](https://simpleicons.org/)


## 11ty Shortcodes

### Current year

```javascript
eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
```

### SVG icon

Custom shortcode used with [eleventy-plugin-svg-sprite](https://github.com/patrickxchong/eleventy-plugin-svg-sprite) with my own personal preferences.

```javascript
eleventyConfig.addShortcode("icon", (name, extraClass) => {
    return `<svg class="svg-icon ${extraClass}" focusable="false" aria-hidden="true"><use xlink:href="#svg-${name}"></use></svg>`;
});
```
### Codepen embed

```javascript
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
```
