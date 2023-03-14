---
title: Email accessibility is also important
description: >-
  An email that only features the word “alt_text”, its either a misunderstanding
  of how to fix an accessibility error or just laziness.
date: '2019-07-23T00:52:52.091Z'
hero: /assets/blog/1__1c6Y__AJKF2DDyqEah6uioQ.jpeg
tags: []
---

_I recently received an email from the_ [_Hyundai A-League_](https://www.a-league.com.au/)_, Im a supporter of the local A-League team and my son plays soccer at a club level, along the way I have become signed up to a newsletter.   
I might cop some flack for naming and shaming like this but I feel this is a very good example of either a misunderstanding of how to fix an accessibility error or just laziness._

---

When the email popped through as most people do, I had a quick glance at my phone to see the notification to see if its something I should action straight away, who knows someone may have been offering me millions of dollars right then and there.

Here is a screenshot of the notification:

![screenshot of iOS email notification where most of the text reads "alt_text"](/assets/blog/1_0bUFu4eZA90jv_cVKQ_png.jpeg)

When I got home I decided to look into this a bit deeper.

Here is a screenshot of the email in the browser:

![screenshot of email view in the browser](/assets/blog/1_KNELJryTAC09pormZRBFfA.png)

There are five navigational elements at the top of the email:

*   download app
*   store
*   facebook
*   twitter
*   instagram

All of these elements are images.

Followed by eight call to actions, each is a promotional image and text. All of these call to actions are just images with links.

This is followed by a section dedicated to the A-league sponsors, featuring each sponsors logo in a single image and a link to A-Leauge’s website partner page.

Finally at the end of it all we get our text and its the enthralling information about unsubscribing and how and why we received this email.

The best and worst part about this email is each image mentioned above has an `alt` attribute, the worst part is each alt attribute contains the following text **“alt\_text”**.

That problem alone has made this email completely inaccessible to anyone who uses a screen reader, even those people who have external images turned off in their email client — from a quick search that is potentially 40% of subscribers.

![screenshot of email with images turned off showing the fail alt text](/assets/blog/1_MlPT13DomQ0rbkY3OiIlwQ.png)

I wont be getting into all the possible solutions for getting accessible text into emails where images are used, but the easiest one is to just use the alt attribute correctly.

For the 5 navigational elements at the top are made up of 10 seperate images, first there is an icon which relates to the next image which is text e.g. download app.   
The five icon images it would be best to use an empty alt attribute `alt=""` this lets is know the meaning the image is presentational and is less important.  
Each of the images containing text should at least have the same text present in the image, extra brownie points for providing something more descriptive, see below for an example.

*   **download app =** download my football live app
*   **store =** visit our store
*   **facebook =** follow us on facebook

After that each call to action needs the text used in the image to be replicated in the alt attribute, see the following as potential alt text.

*   All the latest transfer news, keep reading
*   Match preview: Western Sydney Wanderers vs Leeds United, keep reading
*   “Surreal” Pogba experience for Glory’s Tratt, keep reading

I wont continue explaining the rest as the same would go for the sponsors section.

Immediately that simple consideration of meaningful alt text would improve the notification that appeared on my phone, plus the experience for any screen reader users and anyone with images turned off.

![Example of screenshot of email with better alt text](/assets/blog/1_bhHKUcZAdK8u-95qZ9MdHw.png)

As mentioned at the start I might cop some flack for “naming and shaming” so to speak, but my hope is this helps improve a process by the developers or content managers. Which in turn will improve another persons experience on the internet. Remember the internet originally was just text based. If we can stick to our roots and provide the appropriate text alternatives and make it beautiful from there on our we would be ticking off a big accessibility issue.

Have I missed something important in this article or said something that is wrong? Please comment/message me and let me know.