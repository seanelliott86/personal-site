---
title: How a missing autocomplete attribute, is making me question my life choices
hero: /assets/uploads/autofill-browser.jpg
date: 2025-03-29T21:36:00.000Z
tags:
  - post
---
Inspiration can strike from anywhere for my blog articles, this one? Pure frustration from an almost daily process of logging into my Network Attached Storage (NAS) via the browser.

Here's the login process:

1. Open NAS portal.
2. Apple Passwords suggests a username to autofill. Click next to show the Password field.
3. No password autofill shown or available when interacting the the field.
4. Click the Apple Passwords extension in Chrome’s toolbar.
5. Select password, password autofills field, click Next.
6. Apple Passwords suggests a one-time code to fill.
7. Wonder if I really need access my NAS that badly.

To really drive the point home, I made a [video of the autofill experience](https://www.youtube.com/watch?v=9xIND8ZOv5Q).

You might be wondering, what’s the issue? 

It’s the extra effort required to fill the password. Instead of seeing an inline suggestion, like the one I get when filling the username or one-time code fields, I have to manually trigger the autofill options by accessing the extension.

I've pinned the Apple Passwords extension, so it’s only three clicks instead of two (that includes clicking next). But if the extension was hidden, it would be an even clunkier process with four clicks.

So when it comes to accessibility in web development, even the smallest of features can make a significant difference for everyone. One such feature is the `autocomplete` attribute. This often overlooked attribute plays a vital role in improving user experience and is one of the simplest things you could add today!

## What is the `autocomplete` attribute?

The `autocomplete` attribute provides a way for browsers to fill in known user information for common form elements: text inputs, textareas, selects, and even entire forms. 

While visible form labels are helpful in general, the wide variety of potential labels for common form fields makes that task harder for browsers, extensions or assistive tech to do effectively and if the machines struggle then us simple humans will as well.

The `autocomplete` attribute accepts a value, which is standardised and specific to give the browser a nudge indicating the type of information an input expects (e.g., "name," "email," "address").

```html
<label for="email">Email address</label>
<input id="email" type="email" name="email-address" autocomplete="email" />
```

This example tells the browser to suggest the user’s stored email addresses, reducing the need for manual typing.

## Who benefits from autocomplete?

* People with cognitive disabilities who might find filling out forms challenging.
* People with motor disabilities who find typing difficult and appreciate the time saving boost `autocomplete` offers.
* Folks with memory impairments who may have trouble remembering details like addresses or emails.
* People with reading difficulties who benefit from familiar icons displayed alongside input fields, making it easier to understand their purpose.

But `autocomplete` benefits everyone. Whether you have a disability or just appreciate the convenience of your browser filling in complex passwords and personal details, `autocomplete` makes online experiences faster, simpler, and less frustrating. And in a world where security best practices demand longer, more complex passwords, who wouldn’t want a little extra help?

## Autocomplete is a WCAG requirement

The [success criteria 1.3.5: Identify Input Purpose (Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html) was added to WCAG in 2018 and this criteria aims to help users with disabilities understand what’s expected when filling out form fields.

While visible labels and instructions are important, 1.3.5 also requires that the purpose of each input be programmatically identifiable. One of the most effective ways to achieve this is by using the `autocomplete` attribute. Hence the criteria being added.

## What are some best practices for using autocomplete

To make the most of the `autocomplete` attribute, here are a few tips to get it right:

### 1. Use it when it makes sense

Only enable `autocomplete` when you’re asking for *the user’s* personal information, not someone else’s. For example, if your form has a field to fill in a different family member’s email address thats not the immediate user, you wouldn't want `autocomplete` on, since it would suggest filling the wrong details. Leading to mistakes and frustration.

### 2. Always include clear labels

Even while including `autocomplete`, it’s important to have descriptive labels for each field. This helps screen reader users know what info is needed and makes things clearer for everyone.

### 3. Be specific with your values

Pick the most accurate `autocomplete` value for each field. Don’t always leave it blank or use something too general, that kind of defeats the purpose! Here are a few common examples:

* **Full name** = `name`  
* **Email address** = `email`  
* **Phone number** = `tel`  
* **Street address** = `street-address`  
* **Post code** = `postal-code`  
* **Credit card number** = `cc-number`

For the full list of `autocomplete` values (and to geek out a bit more), check out the [Autocomplete MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).

## From PMs to QAs: How to get autocomplete right

Instead of just providing engineer centric advice, here's what I would expect from a well coordinated, cross disciplinary effort.

### PM's

* Write inclusive acceptance criteria that calls out `autocomplete` as a requirement.  
* Ensure criteria are considered during design, development, and testing phases.  

### Designers

* Annotate designs to define expected `autocomplete` attributes.  
* Pair with engineers to discuss available `autocomplete` values.

### Engineers

* Review designs early and provide feedback.  
* Suggest improvements for missing or incorrect `autocomplete` attributes.  
* Include `autocomplete` checks in tests and use the attribute consistently in code.  

### QAs

* Check for missing or incorrect `autocomplete` attributes.  
* Test autofill across browsers and devices.  

This is by no means an exhaustive list but it's a good start!

## So, what’s the moral of the story?

It turns out, a missing autocomplete attribute can be the difference between a seamless login experience and spiralling into existential dread while logging into your NAS, well for me anyway.

The good news? It’s a problem with a straightforward solution. Adding `autocomplete` attributes is simple, improves accessibility, and enhances the experience for everyone—whether you’re using assistive technologies or just trying use the 37 character password your browser or password manager thankfully saved for you.

By taking the time to implement `autocomplete` correctly, we can all save a little frustration and a lot of unnecessary interactions. And who knows? Maybe next time, I’ll actually get into my NAS without questioning every life choice I’ve made along the way.

Now, if you’ll excuse me, I have to submit bug to my NAS vendor to update their forms.
