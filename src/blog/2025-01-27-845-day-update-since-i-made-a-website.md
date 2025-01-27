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

Below is each test screenshot, I will also include a text description and link to the full results.

**January 15 2025 results**

![](assets/uploads/jan-15-2025-results.jpg)

* Requests: 9
* Bytes Transferred: 772.89kB
* Bytes Total: 1.19MB

[Full results for January 15](https://radar.cloudflare.com/scan/08f4d97b-8c98-4756-9ab8-ef940fb946b2/summary)

[](https://radar.cloudflare.com/scan/08f4d97b-8c98-4756-9ab8-ef940fb946b2/summary)
