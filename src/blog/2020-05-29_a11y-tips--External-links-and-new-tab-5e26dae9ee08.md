---
title: 'a11y tips: External links and new tab'
description: Should you open external links in new tabs? How should they be displayed?
date: '2020-05-29T08:52:19.258Z'
hero: /assets/uploads/1__bSaC0vJIoFl67kfi5ynfjw.jpeg
tags: [a11ytips]
---

_a11y tips is a series of short articles (300ish words) which stem from answers to questions I have been asked about web accessibility. These tips will hopefully help others and may also bring to the surface some obscure rules, tips and techniques._

**The question:** Should external links always open in a new tab, what is the recommended way to show that a link is external??

**My answer:** Regardless of if a link is external or not, we shouldn't open links in new tabs, but there can be instances where it is advisable. Inline text is the best way to show a link opens in a new tab, avoid icons, just keep it simple.

### First, what harm is there in opening links in a new tab?

*   It can be disorienting to screen reader users, those with cognitive impairments or people who magnify their screen.
*   It instantly makes it harder to go back to the page you left, this affects all users.
*   Opening a new tab takes control out of the user's hands.

[**W3C’s** states](https://www.w3.org/TR/WCAG20-TECHS/G200.html): “In general, it is better not to open new windows and tabs since they can be disorienting for people, especially people who have difficulty perceiving visual content.”

**Power mapper** [tested screen reader compatibility for external links](https://www.powermapper.com/tests/screen-readers/navigation/a-target-blank/), the results scream don’t open external links in new tabs.

**Neilson Norman Group** has spoken about this subject repeatedly starting in [1999](https://www.nngroup.com/articles/the-top-ten-web-design-mistakes-of-1999/), [2005](https://www.nngroup.com/articles/top-ten-web-design-mistakes-of-2005/) and [2011](https://www.nngroup.com/articles/top-10-mistakes-web-design/) with a variety of reasons why it should be avoided.

So there are some pretty clear opinions from a variety of people to not do it unless there is a very very specific need.

### Second, why no icons?

Generally, the icons used are a square with an arrow pointing to the top right, but there are lots of others around and because there is no consistent icon there can be some ambiguity, which doesn't help everyone understand the purpose of the icon.

Most solutions use an icon added as a background image or font icon shown via CSS, this excludes screen reader users because there is no text alternative, so not really a robust solution.

### My recommendation

If you still need to open links in a new tab there needs to be some sort of warning so the user is aware before they initiate that link.  
Personally, I recommend keeping it simple, example:

[What is accessibility? (opens in new tab)](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility)

```html
<a href=”https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility”>
What is accessibility? (opens in new tab)
</a>
```

Sure it's not the prettiest, but it provides a clear warning to all users.   
Also with the recommendation that most if not all links should open in the same window the use of the above example should be minimal.

As mentioned there are exceptions, they include:

*   Linking to information that lives outside of a secure section of the site, this helps the user avoid having to reauthenticate once they are finished reading the linked information.
*   Linking to documents that are not web pages like PDF’s
