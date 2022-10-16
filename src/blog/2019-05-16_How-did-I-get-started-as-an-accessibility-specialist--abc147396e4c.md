---
title: How did I get started as an accessibility specialist?
description: >-
  A dive into how I got start in frontend development and how it lead me to
  accessibility.
date: '2019-05-16T05:10:54.415Z'
tags: []
---

As a young teen in high school, I learnt the dark arts of web development, tables design was the only way to build a site worth a damn and if you didn't have some sort of hit counter on your website, then you sucked!

> So what if I only have 500 hits, I’ll get more soon \*refresh, refresh, refresh…\* hahaha I’m at 5000 hits, now you suck! — Sean

Then I found the CSS Zen Garden, I tore that site apart to understand this magic of tableless design, finally it clicked, I hit the delete button on my knowledge for table layouts and left them behind forever.

> THE REVOLUTION HAS BEGUN, TABLES SUCK, GOODBYE SPACER GIFS — Sean

I toiled on my craft while “running” a tiny web development business from my bedroom at my parent’s place. This helped me to perfect my skills in development. I was sales. I was design. I was frontend dev and backend dev. And I was a shitty accountant.

I did the work for yourself thing for a while, eventually I got a full-time job, and this time I didn't have to do the accounting. Eventually I worked out I liked designing but I didn’t like backend programming. Frontend is best of both worlds, so I decided to do that instead. Enter agency land.

I would say I was like everyone who calls themselves a frontend developer at some point in time. When asked in interviews about accessibility my answer was always the same.

> “…yeah my sites are accessible, I add aria to make things accessible” — Sean

To be honest that was all I ever needed to say. But I didn't really know accessibility, I knew the buzz words interviewers were listening for to evaluate me and my frontend-ness.

I remember looking numerous times at the WCAG spec and being overwhelmed. I’m like Homer Simpson, keep it simple or it is going over my head. I was also young just starting in my development career and it seemed like heaps of extra hard work.

> “Best to skip that accessibility stuff for the moment. It wont come up at all during your career” — Sean

Fast forward a few years and many things have changed. I have no hair on the top of my head, have a beard, frontend development is moving at a cracking pace! I’ve been working on a project and we are rounding the corner and coming to the finish, when in came what every dev fears… Client feedback!

This client project dealt with showing very important information to users after they have logged in. As it turns out, one of our client’s users was blind. He was also on the executive board and had access to an early release of the project.  
The issue was this: When using his screen reader he wasn’t able to hear information specific to his account. SPRUNG! This project was not accessible…

> “SHIT SHIT SHIT SHIT SHIT” — Sean

What did we do? We started the task of making the website accessible, but where do you start when the whole website isn't accessible.

We started small, making simple changes.

*   If it’s clickable, it should be a button or a link.   
    To my shame I wasn’t doing this very simple thing, [I wrote about buttons and links earlier](https://medium.com/@sean_1138/a11y-tips-button-or-link-and-which-to-use-107ced280fee).
*   Images should have alt attribute.  
    Even an empty one if the image isn’t informative, [I wrote about alt tags earlier](https://medium.com/@sean_1138/what-do-we-need-alt-tags-where-do-we-need-them-everywhere-51d66740f0c7).

Some of the fixes got harder requiring rewrites of massive amounts of code.

*   A user’s focus should be shifted into a modal window after it is opened. When the modal closes, make sure you shift the user focus back to the button that they clicked to open the modal.
*   Graph/Chart information shouldn't rely on colour alone, provide a text alternative in table form.

Slowly, page by page, we reached a satisfactory level of accessibility. It took **6 months** to fix the accessibility issues in the project which initially took 6 months to build.

While working on the fixes for that project, it become abundantly clear by doing all the refactoring and reading of the WCAG spec that accessibility is really easy, **if you do it right from the start**.

Much like Scarlett O’hara from Gone with the Wind. I said to myself out loud…

> “As God is my witness, I’ll never deliver an inaccessible website again!” — Sean

As with all agency work, the next project was not far off. I focused more on doing things right from the start.  
I was reading websites like [Wuchag](https://www.wuhcag.com) which is an amazing resource for beginners, along with making sure I understood the WCAG guidelines in greater detail. I discovered that baked into standard HTML is an amazing level of accessibility, it just had to be used correctly.

I actually started using a screen reader, there I was standing at my desk, headphones on, eyes shut listening to my HTML, doing my best to understand what was going on, how things could be done better. Much like my early development days, I pulled apart what I didn't know, just so I could understand it in more depth.

The next website I developed I achieved a better baseline from the start. Links and buttons were used correctly, focus states were visible, images had alt tags by default.

I started to become a squeaky wheel when it came to reviewing designs or peer reviewing code, I had turned into robocop for web accessibility.

> “Excuse me. I have to go. Somewhere there is a accessibility crime happening.” — Sean

Eventually I joined a project where there was a massive focus on accessibility. Every time a new feature was being discussed for a future release there was a lot of effort to work out how we would we make sure that feature is accessible.

The more accessibility work I was doing, the more I was learning and also refining what I already knew.   
But I was still a frontend developer with no qualifications, when asked in interviews if I do accessibility, I could talk in great depth about web accessibility but I always worried the only thing interviewers heard was.

> “…yeah my sites are accessible, I add aria to make things accessible” — Sean

I decided to go back to school and get certified, and completed the [Professional Certificate in Web Accessibility course](https://www.mediaaccess.org.au/digitalaccessibilityservices/services/education-and-training/pcwa/). Throughout the course my knowledge was reaffirmed, which gave me the confidence in knowing that what I was talking about is correct.

I spend 95% of my waking hours on the internet, yet still there seems to be a consistent lack of care around accessibility or the opinion that its not that important, at least not as important as the latest and greatest frontend framework.

This lack of care around web accessibility is an injustice to those who need it the most. Its not the fault of the client their website isn't accessible, its the fault of the developer who didn't use the right mark up, its the fault of the designer who didn’t check the colour contrast, its up to everyone working on the project to ensure accessibility is baked in.

What is the solution? For me I like to talk about the basics of HTML and accessibility. Those two areas go hand in hand, if you do the HTML right your on your way to being accessible without putting in much effort.   
I also like to simplify the entry point for accessibility, I’m not saying the WCAG guidelines are complex scientific papers, but I feel for newbies it can be overwhelming, I’ve been there myself, so I keep writing articles that [simply explain the new guidelines](https://medium.com/@sean_1138/wcag-2-1-new-guidelines-simplified-3dbd566fcc96) or old guidelines, or share little tips and tricks which will be helpful to someone just starting out in this area.

Hopefully my small contribution can start a fire that spreads and helps make the web a more accessible place to the people who need it the most.

If your interested in the topic of accessibility but are not sure where to start, try to get out to some of the [public events](http://globalaccessibilityawarenessday.org/events.html) that are running as part of Global Accessibility Awareness Day, because awareness is where it all starts.

Thanks for reading, please leave a comment or message me your thoughts on accessibility and GAAD.