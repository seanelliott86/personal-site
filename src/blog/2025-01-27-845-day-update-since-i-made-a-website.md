---
title: 845 day update since I made a website!
date: 2025-01-27T18:52:00.000Z
tags:
  - post
---
Well, hello there!

Since I first published this site, in October 2022 - yes that long ago there have been some updates.

I publish 2 articles, the first one about [ensuring the focus appearance of focusable elements is accessible](https://www.seanelliott.au/blog/2024-05-16-is-your-focus-appearance-accessible/) and the other about [leveraging React Testing Library for accessibility testing](https://www.seanelliott.au/blog/2024-12-27-catching-accessibility-issues-early-with-react-testing-library/).

Not a lot in terms of blogging, mainly little updates here and there to improve things with the built or bump versions of dependancies.

But recently I got really stuck into optimising the site. 

Im not sure what started this maybe because I've circled back to an idea I had years ago that my personal site would have a resume section, which potential recruiters could visit and then print, so leveraging some awesome print css wizardry and I wouldn't need to have a word doc anymore buuuuut, thats still a work in progress.

But I can tell you about 3 weeks ago I really got stuck in, a quick summary:

* Updated all dependencies to latest version - eleventy is now at v3 so that required a bit of work.
* Removed SASS and went vanilla CSS, with a little bit of PostCSS.
* Started using Yarn - honestly I thought I was before, but based off my commits that wasnt the case.

Once I had done that, I thought, well your in this far, might as well update your CSS to use logical properties, meaning I updated all my `margin-left`, `margin-right` etc to be `margin-inline-start`, `margin-inline-end` to make it easier when I want my site to be LTR/RTL.

Then something funny happened I just decided to look at how heavy my site is. Stupidly I though "hey your a super awesome frontend dev, you made a static site. Its much quicker then any framework driven site".

Shamefully that wasn't the case, when I checked with [Cloudflare radar url scanner](https://radar.cloudflare.com/scan), the results were bad to say the least.

![Network traffic results 15th of January 2025, 9 requests, 772 kilobytes transferred, 1.19 megabytes total](assets/uploads/jan-15-2025-results.jpg)

[](https://radar.cloudflare.com/scan/08f4d97b-8c98-4756-9ab8-ef940fb946b2/summary)I was shocked at the results of the scan, [see the full results](https://radar.cloudflare.com/scan/08f4d97b-8c98-4756-9ab8-ef940fb946b2/summary), ~1.20MB just to view my homepage. I dove into the networks list and found a few culprits:

* 9kb of google fonts
* 111.1kB of google analytics scripts
* 589kB for a single images
* 54kB of netlify login script

I then went about improving this experience by:

* minifying the css - should of been done at the start but it wasnt.
* moved the netlify login script so its not always there

![Network traffic results 16th of January 2025, 8 requests, 717 kilobytes transferred, 915 kilobytes total](assets/uploads/jan-16-2025-results.jpg)

* Requests: 8
* Bytes Transferred: 717kB
* Bytes Total: 951kB

As you can see these simple changes got me under 1MB, but I didn't stop there.

Next I had an existential crisis, will my website survive without Google Analytics (GA), what about other analytics options, should I write my own.

To be honest, I haven't ever looked at GA since installing it on my site, so I figure all I'm doing is pandering to the unwritten rules of "you must use GA on your website or be smote". \
Plus I doubt I will ever use GA to its fullest. Nor did I want to write my own analytics script. Meaning I had to find a replacement, enter [GoatCounter](https://www.goatcounter.com/). \
Now instead of 111kB of GA script to collect data I wont look at, I now have ~3.5kB of GoatCounter script and I am collection more then enough analytical data which I still wont look at - win win.

Another quick win was self hosting the google font and making some font adjustments to reduce things like [First Contentful Paint (FCP)](https://web.dev/articles/fcp)and [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp). I leveraged a few tools for this:

* [google-webfonts-helper](https://gwfh.mranftl.com/fonts/) to download the files locally which have the charsets and styles I need and nothing else.
* [Fallback Font Generator](https://screenspan.net/fallback) to tweak the fallback font.

I may have shaved off only 1kb with a result of 7.99kB, but there is less requests now and the performance is better in relation to FCP and LCP. I think there is still more I can do here.

[](https://web.dev/articles/lcp)The most impactful update was dealing with the images, I'll be honest I quickly dropped that image on the homepage, because the design needed something other then text. So I admit, I could have done better a long time ago by just optimising the 675 x 675px image down from its almost 600kB size.

Implementing responsive images took sometime, I leveraged a plugin from 11ty called [eleventy-img](https://www.11ty.dev/docs/plugins/image/). I modified how to use to also cover images in markdown - mainly images inserted when writing articles using Decap CMS. 

I identified a few "presets" for different images use cases, for instance my blog article have a hero image, which are a consistent size width wise.

My first attempt was good, but I need to do more as I wasn't using the `sizes` attribute correctly, thats where this handy bookmarklet called [RespImageLint - Linter for Responsive Images](https://ausi.github.io/respimagelint/) helped out. It evaluated where I was going wrong and suggest changes. Its still not 100% perfect but its far better.

After is all said and done this was the final result of my work.

![Network traffic results 27th of January 2025, 8 requests, 38 kilobytes transferred, 58 kilobytes total](assets/uploads/jan-27-2025-results-final.jpg)

Thats a huge 95.13% decrease in total bytes! You can see the [full results of the January 27 scan](https://radar.cloudflare.com/scan/17b220ab-b6e4-42c9-a652-7eee3f5073b8/summary) for even more details.

I personally remember a time where having the most optimized website to reduce load times was super important. Somewhere a long the way I forgot that and I bet a lot of other people have as well. Some of you may scoff and say "well we have fast internet now, its not the dark ages of dial up" but have you ever struggled to load a site because you have only 1 bar of 4G or less. Personally I did today. I wanted to find a [](https://radar.cloudflare.com/scan/17b220ab-b6e4-42c9-a652-7eee3f5073b8/summary)[](https://radar.cloudflare.com/scan/17b220ab-b6e4-42c9-a652-7eee3f5073b8/summary)[](https://www.goatcounter.com/)
