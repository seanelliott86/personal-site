---
title: Is your focus appearance accessible?
description: ""
hero: /assets/blog/stefan-cosma-0go3-b-5m80-unsplash.jpg
date: 2024-05-16T16:21:00.000Z
tags:
  - post
---
Today is [Global Accessibility Awareness Day (GAAD)](https://accessibility.day/) a day for us to learn, reflect and talk about accessibility!

So what better day than today to share my thoughts about one of the newer guidelines that everyone should be adding to their to-do list, but might not be because of its AAA rating? That guideline is [2.4.13 Focus Appearance (Level AAA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html).

For most accessibility-minded people this will be common knowledge but for those who are not fully aware when browsing the web, have you ever noticed that little outline around buttons or links when you interact with them? That's the focus indicator, and it plays a crucial role in making websites accessible to everyone.

## But why does the focus indicator matter? Let's break it down.

Many users rely on keyboards to navigate websites, especially those with motor disabilities. The focus indicator helps them understand which element is selected as they tab through the page, making navigation easier and more efficient.

For people with low vision, distinguishing between elements on a screen can be difficult. The focus indicator provides a visual cue that helps them identify where they are on the page and which element they're interacting with, improving their browsing experience.

This new guideline is pivotal in ensuring the focus indicator appearance is visible for those users as it defines a **minimum area of visibility** and also a **contrast ratio** that needs to be met. It is closely related to the [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) and [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) guidelines but Non-text Contrast requires the focusable elements to have adequate contrast against the background it is sitting on in each of its states, Focus Appearance requires sufficient contrast for the focus indicator itself.

## So how can you achieve an accessible focus indicator?

The guideline gives us the answers we need in the success criteria:

> When the keyboard focus indicator is visible, an area of the focus indicator meets all the following:
>
> * is at least as large as the area of a 2 CSS pixel thick perimeter of the unfocused component or sub-component, and
> * has a contrast ratio of at least 3:1 between the same pixels in the focused and unfocused states.

To make it easier, I've broken this down into 3 steps:

1. Don't ever turn off outlines... ever
2. Set your outline width to 2px at least
3. Pick a colour that passes a 3:1 contrast ratio against the background of your site

That's it, job done, you can go celebrate with a crisp high five!

![Penguines of madagascar performing a high one](/assets/blog/1687520159124.gif)

I prefer using the outline property but the guideline is fluid enough to allow other methods to have an accessible focus indicator, it just becomes a bit harder to check. I also think adding an offset to your outline really helps your focus indicator stand out. 

This is kind of all you need in your css.

```css
:focus {
    outline: [your color here] solid 2px;
    outline-offset: 2px;
}
```

## Speaking of testing... a shameless plug is incoming.

I got bored one night a month ago and thought to myself, I wonder if you can test for this with a simple script. So I started to throw code around, trying different things and I ended up creating a bookmarklet called [Focus Faux Pas](https://seanelliott86.github.io/focus-faux-pas/). It's even got its own little homepage. So cute! Click through to the Focus Faux Pas homepage follow the instructions and give it a try on a website.

Focus Faux Pas calculates the minimum and actual focus areas for focusable elements, taking into account style details like outline width and outline offset. It also checks the outline color to see if it passes 3:1 contrast ratio (assuming it finds a background color, otherwise it defaults to white). It then creates a result window to show if each element's focus game is up to snuff or needs a little extra love. 

### What Focus Faux Pas doesn't check... just yet?

* Elements like inputs, selects just yet... need to work on a useful way to display results
* Other outline styles (inset, dotted etc)
* Conformance via other methods to produce an "outline" such and box-shadow

I'm sure what I've created is going well above and beyond a bookmarklet but it was a fun little experiment and I'm certainly open to feedback and improvements.

## Wrapping up

Focus Appearance is a really important guideline and I've heard through the years that AAA guidelines are too hard to achieve but this one is really easy if you keep it simple. Obviously, I've not gone into a ton of depth here on focus, there are amazing pieces of work out there like [Sara Soueidan's guide to designing accessible, WCAG-conformant focus indicators](https://www.sarasoueidan.com/blog/focus-indicators/) that do a far better job than I ever could, but hopefully this little piece starts a conversation or gets you thinking a little more about how to make your corner of the web a more accessible place by adding this guideline to your todo list.

Have I missed something important in this article or said something that is wrong? Please message me and let me know.
