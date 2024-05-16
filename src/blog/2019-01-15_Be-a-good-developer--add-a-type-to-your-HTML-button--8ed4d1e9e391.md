---
title: 'Be a good developer, add a type to your HTML button.'
description: Why is type the most useful attribute for buttons
date: '2019-01-15T01:41:02.487Z'
hero: /assets/blog/1__TQx2H__l4hel__N5tBxQbGiQ.jpeg
tags: []
---

Be a good developer, add a type to your HTML button.

Why is a `type` attribute important on your HTML `<button>` element?

Without specifying a type your awesome button defaults to `type="submit"`, which as the attribute suggest causes a submit event if the button is inside a `<form>` element… I’m looking at you .net developed sites.

Whats the solution then… well you have 3 options to choose from for the `type="”` attribute:

1.  `submit` if you need to submit a form
2.  `reset` if you need to reset a form
3.  `button` if you need a generic no-frills clickable button that does nothing else (until you assign it something via JavaScript)

99.999999999% of the time I’m going to say you will be using `type="button"`, especially if your an amazing frontend developer who cares if they need to [use a button or a link](https://medium.com/@sean_1138/a11y-tips-button-or-link-and-which-to-use-107ced280fee) in their frontend code.

As simple as this seems, on a \`lot of the projects I have worked on each and everyone has had a bug raised at some point which ends up being related to a non-specified type attribute.

This also means you don't have to worry about `return false;` for onclick events or `event.preventDefault();`