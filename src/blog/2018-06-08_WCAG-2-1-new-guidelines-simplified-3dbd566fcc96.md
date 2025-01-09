---
title: WCAG 2.1 new guidelines simplified
description: >-
  WCAG guidelines can be a bit much to get your head around especially if your
  just starting out to become an accessibility ninja…
date: '2018-06-08T06:22:54.599Z'
tags: []
---

Sometimes I feel information needs to be simplified and written down using crayons and bright colours just to help everyone else understand what is being spoken about, Homer Simpson is a prime example.

> **Dr. Julius Hibbert:**  
> Homer, I’m afraid you’ll have to undergo a coronary bypass operation.  
> **Homer Simpson:**  
> Say it in English, Doc!
>
> **Dr. Julius Hibbert:**  
> You’re going to need open-heart surgery.  
> **Homer Simpson:**  
> Spare me your medical mumbo jumbo!
>
> **Dr. Julius Hibbert:**  
> We’re going to cut you open and tinker with your ticker.  
> **Homer Simpson:**  
> Could you dumb it down a shade?

![](/assets/uploads/1__ltRuIgQnlosPT__QjAxeYjQ.gif)

On the 5th of June, the W3C released a long-awaited update to the WCAG guidelines. For newbies to accessibility, the guidelines can be daunting. Today I have attempted to “dumb it down a shade” to provide a gateway into the world of accessibility.

Each guideline will link to the actual guidelines on the w3c site and feature a simplified description.

[**1.3.4 Orientation (AA)**](https://www.w3.org/TR/WCAG21/#orientation)

Don’t restrict the user to landscape or portrait as some user have devices fixed in orientation. This can be ignored if a fixed orientation is essential (e.g. piano app where the landscape orientation is essential).

[**1.3.5 Identify Input Purpose (AA)**](https://www.w3.org/TR/WCAG21/#identify-input-purpose)

Use the [autocomplete attribute](https://www.w3.org/TR/html5/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute) (e.g. `autocomplete='street-address'`) values to help browser extensions to fill in form fields. This will be extended in the future to allow users to customise the experience further.

[**1.4.10 Reflow (AA)**](https://www.w3.org/TR/WCAG21/#reflow)

The browser should be able to scale content to 400% without creating multi-directional scrolling.

[**1.4.11 Non-text Contrast (AA)**](https://www.w3.org/TR/WCAG21/#non-text-contrast)

User interface controls and graphical objects need to conform to 3:1 contrast ratio. A graphical object can be a simple print icon or a pie chart, not every graphical object needs to meet the contrast ratio only the ones that require a users understanding of what the graphic is conveying

[**1.4.12 Text Spacing (AA)**](https://www.w3.org/TR/WCAG21/#text-spacing)

This one sounds like you are being forced to use the specified **line height**, **paragraph**, **letter** and **word spacing** properties found in the guidelines but it is actually saying, the user should be able to apply those values via a browser extension or separate stylesheet without the content being lost or broken.

[**1.4.13 Content on Hover or Focus (AA)**](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus)

Content that is shown on hover or focus should be dismissible without using the mouse (pressing escape to hide tooltip) if the content is shown by hover the pointer should be able to move to the shown content without disappearing.

[**2.1.4 Character Key Shortcuts (A)**](https://www.w3.org/TR/WCAG21/#character-key-shortcuts)

If keyboard shortcut has been created using a single key (e.g `w`, `a`, `s`, `d` for directional keys). The shortcuts can be either remapped/turned off by the user or only be active when the user is focused on the component. This is to help users who navigate by speech to prevent triggering a string of shortcuts when dictating commands.

[**2.5.1 Pointer Gestures (A)**](https://www.w3.org/TR/WCAG21/#pointer-gestures)

Anything that can be done by multi-finger (two-finger pinching) or path based (swiping, dragging and drawing) gestures, can be accomplished with a (single pointer) mouse without gestures.

[**2.5.2 Pointer Cancellation (A)**](https://www.w3.org/TR/WCAG21/#pointer-cancellation)

Try not to bind actions to the down event, binding to the down event doesn’t allow the user to cancel a possible mistake.  
Think of it like this, if you click on the wrong link and don’t release the down action on the mouse and move the mouse away from the link you are not taken to the page, the event is cancelled, but if the event was bound to the down event that cancellation wouldn’t be possible.  
 If you need to bind events to down provide a way to undo this selection.

[**2.5.3 Label in Name (A)**](https://www.w3.org/TR/WCAG21/#label-in-name)

The visual text should be included with the accessible name for user control. The accessible name could be for example the `alt` of an image or `aria-label` attribute. For someone who browsers by speech, this poses a problem if the accessible label is different from the visible text as the browser won't know what to action.

[**4.1.3 Status Messages (AA)**](https://www.w3.org/TR/WCAG21/#status-messages)

Provide status messages for important changes in content that are not in focus.  
For example, adding to the shopping cart, the cart icon shows text reading “4 Items” then gets updated to “5 items”, the screen reader should announce “Shopping cart has 5 items”. Anything that takes the focus doesn’t require a status message.

The guidelines are still very new to me and this is my understanding based on reading the success criteria. 