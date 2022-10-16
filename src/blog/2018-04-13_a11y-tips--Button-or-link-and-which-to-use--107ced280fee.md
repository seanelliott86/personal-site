---
title: 'a11y tips: Button or link and which to use.'
description: >-
  Do you use a button or a link on your website. Its quite a simple choice but
  often used incorrectly
date: '2018-04-13T14:09:39.716Z'
tags: []
---

![](/assets/blog/1__7aJPlxn8gwhI7JjcBFr__tQ.jpeg)

_a11y tips is a series of short articles (300ish words) which stem from answers to questions I have been asked about web accessibility. These tips will hopefully help others and may also bring to the surface some obscure rules, tips and techniques._

**The question:** Should I use a button or a link in my \[insert use case here\].

**My answer:** Whats happens when you click on the element in your \[insert use case here\].

I know, I know… I answered with a question but to be honest it IS dependent on the use case and its something only the developer can answer. The developer should know the purpose of the element based off requirements.

**A better answer:** A link `<a href="">...</a>` navigates a user to a new resource (a new page or a part of the same page — with URL fragment), a button `<button type="submit/reset/button">...</button>`actions/controls something on the page.

“Yeah yeah yeah but I could change a link to make it a button ARIA gives me roles, I can change the links to buttons” I can hear you say.  
Well before we go down that road, lets look at the HTML spec to really understand a link.

> [**_4.5.1 The a element:_**](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)  
> If the a element has an href attribute, then it represents a hyperlink

> If the a element has no href attribute, then the element represents a placeholder for where a link might have been placed.

> [**_4.6 Links:_**](https://html.spec.whatwg.org/multipage/links.html#links)
> Links are created by a, area, and link elements, that represent a connection between two resources. There are two kinds of links:

> Links to external resources: stylesheets, javascript etc

> Hyperlinks to other resources that can cause the user agent to navigate to those resources: new pages

Sooooo that says to me a link shouldn’t be a button… right okay good!

Now back to using ARIA roles, surely that means I can make a link into a button??Well yeah sure you can but for it to really represent a button you will have to do the following.

*   add `role='button'`
*   prevent the action of the `href` attribute with javscript
*   add `tabindex='0'` to make it focusable if you remove the `href` — styling will need work to add cursors etc
*   add in your click handler to action whatever it is your Frankenstein link needs to do.
*   add in keypress event to handle the `space` key (buttons have that as a default tied to the click event and is expect by user agents)

Well I’m tired just thinking about all that effort… might be best to just use a button, seems much easier.

_I would like to mention there are sometimes where a developer is forced to use html they have no control to make changes, hopefully the developer in those situations have the ability to change those buttons via javascript using the above mentioned methods. If not then my sympathies…_

Have I missed something important in this article or said something that is wrong? Please comment/message me and let me know.