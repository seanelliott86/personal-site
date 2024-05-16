---
title: 'a11y tips: Disabled buttons and colour contrast.'
description: >-
  Disabled buttons and colour contrast is it important and whats the best
  solution
date: '2018-03-01T02:22:36.373Z'
tags: [a11ytips]
---

**The question:** Do disabled buttons need to conform to colour contrast guidelines?

**The answer:** No disabled buttons do not need to pass color contrast guidelines.

> [**_1.4.3 Contrast (Minimum):_**](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.

Before you rush off and ignore all your disabled buttons there is a Nicki Minaj sized BUT you should consider as well.

[**1.4.1 Use of Color:**](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html) this guideline states colour should not be the only means to convey information.

To make sure your disabled button is the most accessible version of itself, I recommend the following:

*   Use the `disabled` or `aria-disabled` attributes to convey information to screen readers (only use aria attributes as a last resort)
*   Add to your disabled styles `cursor: not-allowed` this will serve as another visual indicator for mouse users.
*   Disabled styles should substantially look different to your non-disabled styles even for those who are RGB blind — grey out the button, dont just mute the colours.

Checkout the quick Codepen example below.

{% codepen 'https://codepen.io/seanus1138/pen/MQLprO' %}

Colour contrast is a big thing for web accessibility, crappy contrast can make the web harder to use for everyone, even those people with 20/20 vision.